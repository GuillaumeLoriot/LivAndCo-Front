import { Component, Input, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Announcement from '../../../models/announcement.interface';
import Review from '../../../models/review.interface';
import Reservation from '../../../models/reservation.interface';
import { TimesPipe } from '../../../pipes/times.pipe';

@Component({
  selector: 'app-review-slider',
  standalone: true,
  imports: [TimesPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './review-slider.component.html',
  styleUrl: './review-slider.component.scss'
})
export class ReviewSliderComponent implements OnInit {

  @Input() announcement: Announcement | null = null;
  tests = [1, 2, 3, 4, 5, 6, 7, 8];
  reviews: Review[] = [];
  reservations: Reservation[] = [];
  stars: number[] = [];

  ngOnInit(): void {
    if (this.announcement) {
      this.reservations = this.announcement.reservations;
      this.getReviews();
    }
  }


  getReviews() {
    for (let reservation of this.reservations) {
      if (reservation.review) {
        this.reviews.push(reservation.review)
      }
    }
  }


}
