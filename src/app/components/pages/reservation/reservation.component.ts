import { Component, inject, OnInit } from '@angular/core';
import { CalendarComponent } from "../../common/calendar/calendar.component";
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { ActivatedRoute } from '@angular/router';
import Announcement from '../../../models/announcement.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CalendarComponent, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit{

  reservationForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  private announcementService = inject(AnnouncementService);
  private route = inject(ActivatedRoute);
  snapshotId: string | null = null;
  announcementid: Number | null = null;
  announcement: Announcement | null = null
  tomorow: string = new Date().toISOString().split('T')[0];
  isSubmitted = false;
  isLoading = false;

  constructor() {
    this.reservationForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(36)]],
      birthdate: ['', [Validators.required]],
      occupation: ['', [Validators.required, Validators.maxLength(50)]],
      gender: [null, [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }


  ngOnInit(): void {
    this.getId();
    this.loadAnnouncement();
  }


  getId() {
    this.snapshotId = this.route.snapshot.paramMap.get('id');
    if (this.snapshotId) {
      this.announcementid = parseInt(this.snapshotId);

    }
  }

  loadAnnouncement() {
    if (this.announcementid) {
      this.announcementService.getAnnouncement(this.announcementid).subscribe({
        next: (data) => {
          this.announcement = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.reservationForm.valid) {
      this.isLoading = true;
      console.log('submited');
      // this.userService.login(this.loginForm.value).subscribe({
      //   next: (data) => {
      //     localStorage.setItem('token', data.token);
      //     console.log(data.token);
      //     this.isLoading = false;
      //     this.router.navigate(['/profile']);
      //   },
      //   error: () => {

      //     console.log('Une erreur est survenue')
      //     this.isLoading = false;

      //   },
      // });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.reservationForm.get(fieldName);
    return Boolean(field && field.invalid && (field.dirty || field.touched || this.isSubmitted));
  }

  getFieldError(fieldName: string): string {
    const field = this.reservationForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} est obligatoire`;
      if (field.errors['minlength']) { return `Minimum ${field.errors['minlength'].requiredLength} caractères`; }
      if (field.errors['maxlength']) { return `Maximum ${field.errors['maxlength'].requiredLength} caractères`; }
      if (field.errors['min']) { return `La durée minimum est de ${field.errors['min'].min} mois`; }
      if (field.errors['max']) { return `La durée maximum est de ${field.errors['max'].max} mois`; }


    }
    return '';
  }


  // -------------UNE METHODE POUR RECUPERER LES UNAVAILABLE RANGE DE L'ANNONCE---------
  // -------------UN INPUUT POUR LES ENVOYE DANS LE CALENDAR POUR AFFICHAGE---------
  // -------------UNE METHODE POUR RECUPERER LA DATE DE DEBUT SELECTIONNEE AU INPUT CHANGE---------
  // -------------UNE METHODE POUR RECUPERER LA DUREE SELECTIONNEE AU INPUT CHANGE---------
  // -------------UNE METHODE QUI CALCULE LA DATE DE FIN A PARTIR DE LA DATE SELECTIONNER ET DE DUREE SI ELLE EST LA---------
  // -------------UNE METHODE QUI BOUCLE SUR UNAVAILABLE RANGE ET VERIFIE LA DISPO VOIR POUR ERREUR A AFFICHER SI CHEVAUCHEMENT---------
  // -------------UNE METHODE QUI PUSH DANS LES EVENTS SI PAS DE CHEVAUCHEMENT (autre couleur que unvaillable)---------

  // si trop long, ne pa afficher, juste verifier les erreurs de chavauchement. voir si comme logique déja faite en symfony, utilisé l'erreur et ne pas réimplementé la logique dans le front
}
