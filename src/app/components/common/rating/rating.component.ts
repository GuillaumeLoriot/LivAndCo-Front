import { Component, Input, OnInit } from '@angular/core';
import Announcement from '../../../models/announcement.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {

  @Input() announcement: Announcement | null = null;

  averageRating: number | null = null;
  reviewCount: number = 0;


ngOnInit(): void {
  this.calculateAverageRating();
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
