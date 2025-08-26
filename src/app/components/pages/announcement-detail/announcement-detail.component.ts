import { Component } from '@angular/core';
import { ResultsMapComponent } from "../../common/results-map/results-map.component";
import { ReviewSliderComponent } from "../../common/review-slider/review-slider.component";
import { ReservationCardComponent } from "../../common/reservation-card/reservation-card.component";

@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [ResultsMapComponent, ReviewSliderComponent, ReservationCardComponent],
  templateUrl: './announcement-detail.component.html',
  styleUrl: './announcement-detail.component.scss'
})
export class AnnouncementDetailComponent {

}
