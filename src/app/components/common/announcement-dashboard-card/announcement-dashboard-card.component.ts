import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import Reservation from '../../../models/reservation.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement-dashboard-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './announcement-dashboard-card.component.html',
  styleUrl: './announcement-dashboard-card.component.scss'
})
export class AnnouncementDashboardCardComponent {
  @Input() reservation: Reservation | null = null;
}
