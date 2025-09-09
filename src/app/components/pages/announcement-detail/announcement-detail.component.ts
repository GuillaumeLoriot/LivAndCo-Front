import { Component, inject, OnInit } from '@angular/core';
import { ResultsMapComponent } from "../../common/results-map/results-map.component";
import { ReviewSliderComponent } from "../../common/review-slider/review-slider.component";
import { ReservationCardComponent } from "../../common/reservation-card/reservation-card.component";
import { CalendarComponent } from "../../common/calendar/calendar.component";
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { ActivatedRoute } from '@angular/router';
import Announcement from '../../../models/announcement.interface';
import { RatingComponent } from "../../common/rating/rating.component";
import { AverageMonthlyPipe } from '../../../pipes/average-monthly.pipe';
import { LoadingComponent } from "../../common/loading/loading.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [CommonModule, ResultsMapComponent, ReviewSliderComponent, ReservationCardComponent, CalendarComponent, RatingComponent, LoadingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {

  private announcementService = inject(AnnouncementService);
  private route = inject(ActivatedRoute);
  snapshotId: string | null = null;
  announcementId: number | null = null;
  announcement: Announcement | null = null
  modalIsOpen = false;
  isLoading = false;

  ngOnInit(): void {
    this.getId();
    this.loadAnnouncement();

  }

  toggleModal() {
    this.modalIsOpen = !this.modalIsOpen;
  }

  getId() {
    this.snapshotId = this.route.snapshot.paramMap.get('id');
    if (this.snapshotId) {
      this.announcementId = parseInt(this.snapshotId);
   
    }
  }

  loadAnnouncement() {
    if (this.announcementId) {
      this.isLoading = true;
      this.announcementService.getAnnouncement(this.announcementId).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.announcement = data;
          console.log(this.announcement);
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        }
      });
    }
  }

}
