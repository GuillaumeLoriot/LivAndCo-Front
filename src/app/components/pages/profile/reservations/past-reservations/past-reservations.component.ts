import { Component, inject, OnInit } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";
import User from '../../../../../models/user.interface';
import { UserService } from '../../../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import Reservation from '../../../../../models/reservation.interface';
import { ReservationService } from '../../../../../services/reservation/reservation.service';
import { LoadingComponent } from "../../../../common/loading/loading.component";

@Component({
  selector: 'app-past-reservations',
  standalone: true,
  imports: [CommonModule, AnnouncementDashboardCardComponent, LoadingComponent],
  templateUrl: './past-reservations.component.html',
  styleUrl: './past-reservations.component.scss'
})
export class PastReservationsComponent implements OnInit {

  reservations: Reservation[] = [];
  reservationService = inject(ReservationService);
  userService = inject(UserService);
  user : User | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  error = false;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
        this.loadOngoingReservations();
      },
      error: (error) => {
        // Affichage de l'erreur dans la template
        if (error.status) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
        this.error = true;
        this.isLoading = false;
      }
    });

  }

  loadOngoingReservations(){
    this.isLoading = true;
    if(!this.user){return}
    const userId = this.user.id;
    this.reservationService.getPastUserReservations(userId).subscribe({
      next: (data) => { 
        this.reservations = data; 
        this.isLoading = false; 
        console.log(data);
      },
      error: (error) => {
        // Affichage de l'erreur dans la template
        if (error.status) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
        this.error = true;
        this.isLoading = false;
      }
    });
  }
}
