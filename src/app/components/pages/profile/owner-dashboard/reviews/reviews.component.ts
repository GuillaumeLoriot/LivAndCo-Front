import { Component } from '@angular/core';
import { ReviewSliderComponent } from "../../../../common/review-slider/review-slider.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReviewSliderComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

}
