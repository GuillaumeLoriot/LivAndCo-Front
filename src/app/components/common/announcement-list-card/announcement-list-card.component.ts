import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import Announcement from '../../../models/announcement.interface';
import { CommonModule } from '@angular/common';
import { RatingComponent } from "../rating/rating.component";
import { AverageMonthlyPipe } from '../../../pipes/average-monthly.pipe';

@Component({
  selector: 'app-announcement-list-card',
  standalone: true,
  imports: [CommonModule, RouterLink, RatingComponent, AverageMonthlyPipe],
  templateUrl: './announcement-list-card.component.html',
  styleUrl: './announcement-list-card.component.scss'
})
export class AnnouncementListCardComponent {

  @Input() announcement: Announcement | null = null;


}
