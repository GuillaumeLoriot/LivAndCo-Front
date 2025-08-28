import { Component } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";

@Component({
  selector: 'app-past-reservations',
  standalone: true,
  imports: [AnnouncementDashboardCardComponent],
  templateUrl: './past-reservations.component.html',
  styleUrl: './past-reservations.component.scss'
})
export class PastReservationsComponent {

}
