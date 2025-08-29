import { Component } from '@angular/core';
import { ResultsMapComponent } from "../../common/results-map/results-map.component";
import { ReviewSliderComponent } from "../../common/review-slider/review-slider.component";
import { ReservationCardComponent } from "../../common/reservation-card/reservation-card.component";
import { CalendarComponent } from "../../common/calendar/calendar.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [CommonModule, ResultsMapComponent, ReviewSliderComponent, ReservationCardComponent, CalendarComponent],
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss']
})
export class AnnouncementDetailComponent {
  modalIsOpen = false;

  toggleModal() {
    this.modalIsOpen = !this.modalIsOpen;
  }
}
