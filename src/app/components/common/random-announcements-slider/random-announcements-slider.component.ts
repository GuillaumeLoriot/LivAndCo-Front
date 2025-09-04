import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Announcement from '../../../models/announcement.interface';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { RatingComponent } from "../rating/rating.component";
import { AverageMonthlyPipe } from '../../../pipes/average-monthly.pipe';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-random-announcements-slider',
  standalone: true,
  imports: [CommonModule, RatingComponent, AverageMonthlyPipe, LoadingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './random-announcements-slider.component.html',
  styleUrl: './random-announcements-slider.component.scss'
})
export class RandomAnnouncementsSliderComponent implements OnInit {

  private announcementService = inject(AnnouncementService);
  announcements: Announcement[] = [];
  isLoading = false;

  // Pagination hydra
  page = 1;
  itemsPerPage = 12;
  totalItems = 0;

ngOnInit(): void {
  this.loadAnnouncements();
}

  loadAnnouncements() {
    this.isLoading = true;
    // J'utilise la pagination hydra pour ne recevoir que 12 résultats et non toutes les annonces (trop lourd)
    this.announcementService.getAnnouncementsPage(this.page, this.itemsPerPage).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.announcements = data['member'];
        this.totalItems = data['totalItems'];
      },
      error: () => {
        this.isLoading = false;
        this.announcements = [];
      }
    });
  }

}
