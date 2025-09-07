import { Component, inject, OnInit } from '@angular/core';
import { CalendarComponent } from "../../common/calendar/calendar.component";
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import Announcement from '../../../models/announcement.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlErrorComponent } from '../../common/errors/form-control-error/form-control-error.component';
import { ReservationService } from '../../../services/reservation/reservation.service';
import Reservation from '../../../models/reservation.interface';
import { LoadingComponent } from "../../common/loading/loading.component";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CalendarComponent, ReactiveFormsModule, FormControlErrorComponent, LoadingComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit{

  reservationForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  private announcementService = inject(AnnouncementService);
  private reservationService = inject(ReservationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  snapshotId: string | null = null;
  announcementid: Number | null = null;
  announcementIri: string = '';
  announcement: Announcement | null = null
  tomorow: string = new Date().toISOString().split('T')[0];
  isSubmitted = false;
  isLoading = false;
  success = false;
  error = false;
  errorMessage: string | null = null;


  constructor() {
    this.reservationForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(36)]],
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
      // Ici de demande du jsonLD pour avoir l'iri
      this.announcementService.getAnnouncementLd(this.announcementid).subscribe({
        next: (data) => {
          this.announcement = data;
          this.announcementIri = (data as any)['@id'];
        },
        error: (error) => {
          // Affichage de l'erreur dans la template
          if (error.status) {
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = "Une erreur est survenue au chargement de l'annonce.";
          }
          this.error = true;
        }
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    // Je reinitialise les messages d'erreur si besoin
    this.error = false;
    this.success = false;
    this.reservationForm.markAllAsTouched();
    if (this.reservationForm.valid) {
      this.isLoading = true;

      // Je prépare les données que je vais transmettre à la méthode de mon service
      const formValue = this.reservationForm.value;
      const reservation = {
        startDate: formValue.startDate,
        duration: formValue.duration,
        announcement: this.announcementIri,
      };
      // Je vérifie bien je j'ai une iri à transmettre et créer un message
      if (!this.announcementIri) {
        this.error = true;
        this.errorMessage = 'Annonce introuvable.';
        this.isLoading = false;
        return;
      }
      // J'appel mon service pour créer une réservation
      this.reservationService.createReservation(reservation).subscribe({
        next: () => {
          this.isLoading = false;
          // J'affiche un message de confirmation avant redirection vers le profil 
          this.success = true;
          this.reservationForm.disable();
          setTimeout(() => this.router.navigate(['/profile']), 3000);
        },
        error: (error) => {
          // Affichage de l'erreur dans la template
          if (error.status) {
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = "Une erreur est survenue lors de la réservation. Veuillez réessayer.";
          }
          this.error = true;
          this.isLoading = false;
        },
      });
    }

  }

}
