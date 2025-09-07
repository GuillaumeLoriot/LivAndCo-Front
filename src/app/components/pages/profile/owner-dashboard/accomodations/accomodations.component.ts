import { Component, inject, OnInit } from '@angular/core';
import { AccomodationDashboardCardComponent } from "../../../../common/accomodation-dashboard-card/accomodation-dashboard-card.component";
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../common/loading/loading.component';
import Accomodation from '../../../../../models/accomodation.interface';
import User from '../../../../../models/user.interface';
import { AccomodationService } from '../../../../../services/accomodation/accomodation.service';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [CommonModule ,AccomodationDashboardCardComponent, LoadingComponent],
  templateUrl: './accomodations.component.html',
  styleUrl: './accomodations.component.scss'
})
export class AccomodationsComponent implements OnInit{
  private accomodationService = inject(AccomodationService);
  private userService = inject(UserService);
  accomodations: Accomodation[] = [];
  selectedAccomodation: Accomodation | null = null;
  selectedAccomodationId: number | null = null;
  connectedUser: User | null = null;
  connectedUserId: number | null = null;
  error = false;
  errorMessage = '';
  isLoading = false;
  success = false;



  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => {
        this.connectedUser = data;
        this.connectedUserId = data.id;
        this.loadAccomodations();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        // Affichage de l'erreur dans la template
        if (error.status) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = "Une erreur est survenue au chargement de l'annonce.";
        }
        this.isLoading = false;
        this.error = true;
      }
    });
  }


  loadAccomodations() {

    const userId = this.connectedUserId;
    if (userId) {
      this.accomodationService.getAccomodations(userId).subscribe({
        next: (data) => {
          this.accomodations = data;
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
