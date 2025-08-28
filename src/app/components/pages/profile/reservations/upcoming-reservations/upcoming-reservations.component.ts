import { Component } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";

@Component({
  selector: 'app-upcoming-reservations',
  standalone: true,
  imports: [AnnouncementDashboardCardComponent],
  templateUrl: './upcoming-reservations.component.html',
  styleUrl: './upcoming-reservations.component.scss'
})
export class UpcomingReservationsComponent {

}
