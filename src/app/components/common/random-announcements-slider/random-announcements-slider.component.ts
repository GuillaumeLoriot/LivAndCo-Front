import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Announcement from '../../../models/announcement.interface';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { RatingComponent } from "../rating/rating.component";
import { AverageMonthlyPipe } from '../../../pipes/average-monthly.pipe';

@Component({
  selector: 'app-random-announcements-slider',
  standalone: true,
  imports: [CommonModule, RatingComponent, AverageMonthlyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './random-announcements-slider.component.html',
  styleUrl: './random-announcements-slider.component.scss'
})
export class RandomAnnouncementsSliderComponent implements OnInit {

  private announcementService = inject(AnnouncementService);
  announcements: Announcement[] = [];

ngOnInit(): void {
  this.loadAnnouncements();
}

  loadAnnouncements() {

    this.announcementService.getAnnouncements().subscribe({
      next: (data) => {
        this.announcements = data;
      },
      error: () => {
        console.log('Une erreur est survenue');
      }
    });
  }

}
