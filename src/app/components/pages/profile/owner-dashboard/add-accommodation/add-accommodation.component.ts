import { Component, inject, OnInit } from '@angular/core';
import { AccomodationService } from '../../../../../services/accomodation/accomodation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import BanFeature from '../../../../../models/ban-feature.interface';
import { GeocodingService } from '../../../../../services/geocoding/geocoding.service';
import { CommonModule } from '@angular/common';
import { FormControlErrorComponent } from '../../../../common/errors/form-control-error/form-control-error.component';
import { ConvenienceService } from '../../../../../services/convenience/convenience.service';
import Convenience from '../../../../../models/convenience.interface';
import { LoadingComponent } from "../../../../common/loading/loading.component";

@Component({
  selector: 'app-add-accommodation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlErrorComponent, LoadingComponent],
  templateUrl: './add-accommodation.component.html',
  styleUrl: './add-accommodation.component.scss'
})
export class AddAccommodationComponent implements OnInit {

  private geocodingService: GeocodingService = inject(GeocodingService);
  private accomodationService: AccomodationService = inject(AccomodationService);
  private convenienceService: ConvenienceService = inject(ConvenienceService)

  accomodationForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  availableConveniences: Convenience[] = [];
  selectedConveniences: string[] = [];

  isLoading = false;
  isSubmitted = false;
  error = false;
  errorMessage = '';
  success = false;

  // Propriétés pour la suggestion des données de l'adresse (ville, code postal, rue, numéro)
  citySuggestions: BanFeature[] = [];
  addressSuggestions: BanFeature[] = [];
  selectedCityCode: string | null = null;



  constructor() {
    this.accomodationForm = this.formBuilder.group({
      addressLine1: ['', [Validators.required, Validators.minLength(3),]],
      city: ['', [Validators.required, Validators.minLength(3),]],
      zipCode: ['', [Validators.required, Validators.minLength(3),]],
      latitude: ['', [Validators.required, Validators.minLength(4),]],
      longitude: ['', [Validators.required, Validators.minLength(4),]],
      surface: ['', [Validators.required]],
      mixedGender: [true],
    });
  }


  ngOnInit(): void {
    this.loadConveniences();

  }



  onSubmit() {
    this.isSubmitted = true;
    // Je reinitialise les messages d'erreur si besoin
    this.error = false;
    this.success = false;
    this.accomodationForm.markAllAsTouched();
    if (this.accomodationForm.valid) {
      this.isLoading = true;
      // Je vérifie bien je j'ai les coordonée sinon message d'erreur
      const { latitude, longitude } = this.accomodationForm.value;
      if (!latitude || !longitude) {
        this.error = true;
        this.errorMessage = 'Choisissez une adresse précise dans la liste pour valider.';
        return;
      }

      // je merge les valeurs du form avec le les conveniences
      const accomodation = {
        ...this.accomodationForm.value,
        conveniences: this.selectedConveniences,
      };

      // J'appel mon service pour créer un logement
      this.accomodationService.postAccomodation(accomodation).subscribe({
        next: () => {
          this.isLoading = false;
          this.success = true;
          this.accomodationForm.disable();
        },
        error: (error) => {
          // Affichage de l'erreur dans la template
          if (error.status) {
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = "Une erreur est survenue lors de la publication de votre logement.";
          }
          this.error = true;
          this.isLoading = false;
        },
      });
    }
  }

  loadConveniences() {
    this.isLoading = true;
    this.convenienceService.getConveniences().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.availableConveniences = data;
      },
      error: () => {
        this.isLoading = false;
        console.log('Une erreur est survenue');
        this.availableConveniences = [];
      }
    });
  }



  // Transforme en iri à partir d'un id
  convenienceIri(convenienceId: number): string {
    return `/api/conveniences/${convenienceId}`;
  }

  // Vérifie si une convenience est déjà présente dans mon tableau quand la case est checked dans la template
  isConvenienceSelected(convenienceId: number): boolean {
    return this.selectedConveniences.includes(this.convenienceIri(convenienceId));
  }

  // Permet d'ajouter ou suprimer un élément du tableau selectedConveniences en fonction de l'état de la checkbox dans la template
  toggleConvenience(convenienceId: number): void {
    const iri = this.convenienceIri(convenienceId);

    // Si le tableau contient déjà l'iri, je filtre pour retourné un tableau sans cette iri
    if (this.selectedConveniences.includes(iri)) {
      this.selectedConveniences = this.selectedConveniences.filter((currentIri) => {
        return currentIri !== iri;
      });

      // Si le tableau ne contient pas l'iri, je l'ajoute
    } else {
      this.selectedConveniences.push(iri);
    }
  }



  // ----------------METHODES DE SUGGESTION D'ADRESSES DANS LE FORMULAIRE----------------------------------


  // Déclenche l’autocomplete de la commune à partir de la saisie (ville ou code postal) si la saisie fais plus de 2 caractères.
  onCityInput() {

    // j'écoute les changements de valeur de l'input city dans le form
    const value = (this.accomodationForm.get('city')?.value ?? '').toString().trim();
    if (!value || value.length < 3) {
      this.citySuggestions = [];
      return;
    }

    this.geocodingService.searchMunicipalities(value, 5).subscribe((features) => {
      this.citySuggestions = features;
    });
  }

  // Renseigne la ville et le code postal depuis la suggestion choisie et mémorise le citycode pour filtrer les rues ensuite.
  pickCity(suggestion: BanFeature) {
    this.accomodationForm.patchValue({
      city: suggestion.properties.city ?? '',
      zipCode: suggestion.properties.postcode ?? '',
    });

    if (suggestion.properties.citycode) {
      this.selectedCityCode = suggestion.properties.citycode;
      this.citySuggestions = [];
    }
  }


  // Déclenche l’autocomplete de l'adresse à partir de la saisie et de la ville sélectionné précédement.

  onAddressInput() {
    const query = (this.accomodationForm.get('addressLine1')?.value ?? '').toString().trim();
    if (query.length < 3) {
      this.addressSuggestions = [];
      return;
    }

    const cityCode = this.selectedCityCode ?? undefined;
    const zipCode = (this.accomodationForm.get('zipCode')?.value ?? '').toString().trim() || undefined;


    this.geocodingService
      .searchAddress(query, cityCode, zipCode, 5)
      .subscribe((features) => {
        this.addressSuggestions = features;
      });
  }


  // Au clic sur une suggestion : on fixe addressLine1 + lat/lon (+ sécurise city/zip si manquants)
  pickAddress(suggestion: BanFeature) {
    const [longitude, latitude] = suggestion.geometry.coordinates; // BAN = [lon, lat]
    const { name, label, city, postcode } = suggestion.properties ?? {};

    this.accomodationForm.patchValue({
      addressLine1: name ?? label ?? '',
      city: city ?? this.accomodationForm.get('city')?.value ?? '',
      zipCode: postcode ?? this.accomodationForm.get('zipCode')?.value ?? '',
      latitude: latitude !== undefined ? Number(latitude).toFixed(7) : '',
      longitude: longitude !== undefined ? Number(longitude).toFixed(7) : '',
    });

    this.addressSuggestions = [];
  }


}
