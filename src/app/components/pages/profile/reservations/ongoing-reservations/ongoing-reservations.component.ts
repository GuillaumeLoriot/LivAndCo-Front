import { Component } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";

@Component({
  selector: 'app-ongoing-reservations',
  standalone: true,
  imports: [AnnouncementDashboardCardComponent],
  templateUrl: './ongoing-reservations.component.html',
  styleUrl: './ongoing-reservations.component.scss'
})
export class OngoingReservationsComponent {

}
