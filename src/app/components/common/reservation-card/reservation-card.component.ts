import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import Announcement from '../../../models/announcement.interface';
import { AverageMonthlyPipe } from '../../../pipes/average-monthly.pipe';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [RouterLink, AverageMonthlyPipe],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss'
})
export class ReservationCardComponent {

  @Input() announcement: Announcement | null = null;

}
