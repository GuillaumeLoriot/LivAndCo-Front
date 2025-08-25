import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewSliderComponent } from "../../common/review-slider/review-slider.component";
import { RandomAnnouncementsSliderComponent } from "../../common/random-announcements-slider/random-announcements-slider.component";
import { SearchBarComponent } from "../../common/search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReviewSliderComponent, RandomAnnouncementsSliderComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
