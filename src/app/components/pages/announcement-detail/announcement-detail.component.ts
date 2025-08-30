import { Component, inject, OnInit } from '@angular/core';
import { ResultsMapComponent } from "../../common/results-map/results-map.component";
import { ReviewSliderComponent } from "../../common/review-slider/review-slider.component";
import { ReservationCardComponent } from "../../common/reservation-card/reservation-card.component";
import { CalendarComponent } from "../../common/calendar/calendar.component";
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { ActivatedRoute } from '@angular/router';
import Announcement from '../../../models/announcement.interface';


@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [CommonModule, ResultsMapComponent, ReviewSliderComponent, ReservationCardComponent, CalendarComponent],
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {

  private announcementService = inject(AnnouncementService);
  private route = inject(ActivatedRoute);
  snapshotId: string | null = null;
  announcementid: Number | null = null;
  announcement: Announcement | null = null
  modalIsOpen = false;

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
      this.announcementid = parseInt(this.snapshotId);
   
    }
  }

  loadAnnouncement() {
    if (this.announcementid) {
      this.announcementService.getAnnouncement(this.announcementid).subscribe({
        next: (data) => {
          this.announcement = data;
          console.log(this.announcement);
        },
        error: () => {
          console.log('Une erreur est survenue');
        }
      });
    }
  }

}
