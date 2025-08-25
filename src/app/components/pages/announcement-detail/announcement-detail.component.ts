import { Component } from '@angular/core';
import { ResultsMapComponent } from "../../common/results-map/results-map.component";
import { ReviewSliderComponent } from "../../common/review-slider/review-slider.component";

@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [ResultsMapComponent, ReviewSliderComponent],
  templateUrl: './announcement-detail.component.html',
  styleUrl: './announcement-detail.component.scss'
})
export class AnnouncementDetailComponent {

}
