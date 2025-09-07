import { Component, inject, OnInit } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";
import { ReservationService } from '../../../../../services/reservation/reservation.service';
import { UserService } from '../../../../../services/user/user.service';
import User from '../../../../../models/user.interface';
import Reservation from '../../../../../models/reservation.interface';
import { CommonModule } from '@angular/common';
import { AverageMonthlyPipe } from '../../../../../pipes/average-monthly.pipe';

@Component({
  selector: 'app-rental-requests',
  standalone: true,
  imports: [CommonModule ,AnnouncementDashboardCardComponent, AverageMonthlyPipe],
  templateUrl: './rental-requests.component.html',
  styleUrl: './rental-requests.component.scss'
})
export class RentalRequestsComponent implements OnInit{

  reservationService = inject(ReservationService);
  userService = inject(UserService);
  reservationRequests: Reservation[] = [];
  selectedReservationRequest:Reservation | null = null;
  selectedReservationRequestId: number | null = null;
  connectedUser: User | null = null;
  connectedUserId: number | null = null;
  modalIsOpen = false;
  error = false;
  errorMessage = '';
  isLoading = false;


  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => {
        this.connectedUser = data;
        this.connectedUserId = data.id;
        this.loadReservationRequests();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  openModal(id:number) {
    this.selectedReservationRequestId= id;
    this.loadSelectedReservationRequest();
    this.modalIsOpen = true;
  }

  closeModal() {
    this.modalIsOpen = false
  }


  loadReservationRequests() {

    const userId = this.connectedUserId;
    if(userId){
      this.reservationService.getReservationRequests(userId).subscribe({
        next: (data) => {
          this.reservationRequests = data;
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



  loadSelectedReservationRequest() {

    const requestId = this.selectedReservationRequestId;
    if (requestId) {
      this.reservationService.getReservation(requestId).subscribe({
        next: (data) => {
          this.selectedReservationRequest = data;
          console.log(data);
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



}
