import { Component, inject, OnInit } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";
import { CommonModule } from '@angular/common';
import User from '../../../../../models/user.interface';
import { UserService } from '../../../../../services/user/user.service';
import Reservation from '../../../../../models/reservation.interface';

@Component({
  selector: 'app-upcoming-reservations',
  standalone: true,
  imports: [CommonModule ,AnnouncementDashboardCardComponent],
  templateUrl: './upcoming-reservations.component.html',
  styleUrl: './upcoming-reservations.component.scss'
})
export class UpcomingReservationsComponent implements OnInit{

user :User | null = null;
  userService= inject(UserService);
  isLoading = false;
  errorMessage: string | null = null;
  error = false;
  upcommingReservations: Reservation[]=[];


  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => { this.user = data; this.isLoading = false;},
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
