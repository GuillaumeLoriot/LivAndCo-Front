import { Component } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [AnnouncementDashboardCardComponent],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {

}
