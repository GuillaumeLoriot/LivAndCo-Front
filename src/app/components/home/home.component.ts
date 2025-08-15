import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewSliderComponent } from "../review-slider/review-slider.component";
import { RandomAnnouncementsSliderComponent } from "../random-announcements-slider/random-announcements-slider.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReviewSliderComponent, RandomAnnouncementsSliderComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
