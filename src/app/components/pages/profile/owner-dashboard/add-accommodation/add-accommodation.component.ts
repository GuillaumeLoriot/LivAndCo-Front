import { Component, inject } from '@angular/core';
import { AccomodationService } from '../../../../../services/accomodation/accomodation.service';
import { UserService } from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import User from '../../../../../models/user.interface';

@Component({
  selector: 'app-add-accommodation',
  standalone: true,
  imports: [],
  templateUrl: './add-accommodation.component.html',
  styleUrl: './add-accommodation.component.scss'
})
export class AddAccommodationComponent {

  private accomodationService :AccomodationService = inject(AccomodationService);
  private userService: UserService = inject(UserService);
  accomodationForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  connectedUser: User | null = null;
  connectedUserId: number | null = null;
  isLoading = false;
  isSubmitted = false;
  error = false;
  errorMessage ='';
  success = false;

// --------------------VOIR POUR INTEROGER UNE API POUR AVOIR LES COORDONEE GEO----------------------------

  constructor() {
    this.accomodationForm = this.formBuilder.group({
      message: ['', []],
    });
  }


  ngOnInit(): void {
    this.loadConnectedUser();

  }


  loadConnectedUser(){
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => { 
        this.connectedUser = data; 
        this.connectedUserId = data.id;
        this.isLoading = false; 
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    // Je reinitialise les messages d'erreur si besoin
    this.error = false;
    this.success = false;
    this.accomodationForm.markAllAsTouched();
    if (this.accomodationForm.valid) {
      this.isLoading = true;
      // Je vérifie bien je j'ai l'id du destinataire à créer un message d'erreur
      if (!this.connectedUser) {
        this.error = true;
        this.errorMessage = 'Annonce introuvable.';
        this.isLoading = false;
        return;
      }


      // J'appel mon service pour créer une réservation
      this.accomodationService.postAccomodation(this.accomodationForm.value).subscribe({
        next: () => {
          this.isLoading = false;
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


}
