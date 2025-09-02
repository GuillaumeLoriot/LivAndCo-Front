import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { AnnouncementListCardComponent } from "../../common/announcement-list-card/announcement-list-card.component";
import { ResultsMapComponent } from "../../common/results-map/results-map.component";
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import Announcement from '../../../models/announcement.interface';
import { LoadingComponent } from "../../common/loading/loading.component";


@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, AnnouncementListCardComponent, ResultsMapComponent, LoadingComponent],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.scss'
})
export class AnnouncementListComponent implements OnInit {

  private announcementService = inject(AnnouncementService);
  announcements: Announcement[] = [];
  answerIsOpen = false;
  isLoading = false;

  // Pagination hydra
  page = 1;
  itemsPerPage = 10;
  total = 0;

  hasNext = false;
  hasPrev = false;

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.isLoading = true;
    this.announcementService.getAnnouncementsPage(this.page, this.itemsPerPage).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.announcements = data['member'];
        this.total = data['totalItems'];
        this.hasNext = Boolean(data.view?.next);
        this.hasPrev = Boolean(data.view?.previous);
      },
      error: () => {
        this.isLoading = false;
        console.log('Une erreur est survenue');
        this.announcements = [];
      }
    });
  }

  goNext(): void {
    if (this.hasNext) {
      this.page++;
      this.loadAnnouncements();
    }
  }

  goPrev(): void {
    if (this.hasPrev && this.page > 1) {
      this.page--;
      this.loadAnnouncements();
    }
  }

  switchOpenClosedAnswer() {
    this.answerIsOpen = !this.answerIsOpen;
  }



}
