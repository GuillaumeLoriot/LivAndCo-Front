import { Component, inject, Input, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Announcement from '../../../models/announcement.interface';
import Review from '../../../models/review.interface';
import Reservation from '../../../models/reservation.interface';
import { TimesPipe } from '../../../pipes/times.pipe';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../services/review/review.service';

@Component({
  selector: 'app-review-slider',
  standalone: true,
  imports: [CommonModule , TimesPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './review-slider.component.html',
  styleUrl: './review-slider.component.scss'
})
export class ReviewSliderComponent implements OnInit {

  private reviewService = inject(ReviewService);
  @Input() announcement: Announcement | null = null;
  reviews: Review[] = [];
  reservations: Reservation[] = [];
  stars: number[] = [];

  ngOnInit(): void {
    if (this.announcement) {
      this.reservations = this.announcement.reservations;
      this.getReviews();
    }else{
      this.loadReviews();
    }
  }

  loadReviews() {
    
      this.reviewService.getReviews().subscribe({
        next: (data) => {
          this.reviews = data;
        },
        error: () => {
          console.log('Une erreur est survenue');
        }
      });
  }


  getReviews() {
    for (let reservation of this.reservations) {
      if (reservation.review) {
        this.reviews.push(reservation.review)
      }
    }
  }


}
