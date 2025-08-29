import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import Announcement from '../../../models/announcement.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement-list-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './announcement-list-card.component.html',
  styleUrl: './announcement-list-card.component.scss'
})
export class AnnouncementListCardComponent {

  @Input() announcement: Announcement | null = null;

  averageRating: number | null = null;
  reviewCount: number = 0;
  monthlyPrice: number | null = null;

  ngOnChanges(): void {
    this.calculateAverageRating();
    this.calculateMonthlyPrice();
  }



  calculateMonthlyPrice(): void {
    if (this.announcement && this.announcement.dailyPrice > 0) {
      this.monthlyPrice = Math.floor((this.announcement.dailyPrice * 365) / 12)
    }
  }

  // Méthode utilitaire de calcul de la moyenne des avis
  calculateAverageRating(): void {
    // Verification que l'annonce existe et possède des réservations
    if (this.announcement?.reservations?.length) {
      let sum = 0;
      let count = 0;

      // Pour chaque reservation on ajoute à la somme et incrémente le compteur
      for (const reservation of this.announcement.reservations) {
        if (reservation.review && typeof reservation.review.rating === 'number') {
          sum += reservation.review.rating;
          count++;
        }
      }

      // On calcule la moyenne qui concerne cette objet
      this.reviewCount = count;
      this.averageRating = count > 0 ? sum / count : null;
    } else {
      this.reviewCount = 0;
      this.averageRating = null;
    }
  }
}
