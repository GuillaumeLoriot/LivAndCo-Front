import { Component, EventEmitter, inject, Output } from '@angular/core';
import SearchFilters from '../../../models/search-filter.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Announcement from '../../../models/announcement.interface';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { HydraCollection } from '../../../models/hydra-collection.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  private announcementSercice = inject(AnnouncementService)
  formBuilder: FormBuilder = inject(FormBuilder);
  searchForm: FormGroup;
  isSubmitted = false;
  @Output() searchResults = new EventEmitter<HydraCollection<Announcement>>();

  page = 1;
  itemsPerPage = 10;

  constructor() {
    this.searchForm = this.formBuilder.group({
      city: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      dailyPrice: ['', [Validators.min(1), Validators.max(300)]],
      nbPlace: ['', [Validators.min(1), Validators.max(30)]],
      startDate: ['', []],
      months: ['', [Validators.min(1), Validators.max(36)]],
    });
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.searchForm.valid) {
      console.log('submited');
      const filters: Partial<SearchFilters> = this.searchForm.value;
      this.announcementSercice.getSearchedAnnouncementsPage(this.page, this.itemsPerPage, filters).subscribe({
        next: (data) => {
          console.log('next');
          console.log(data);
          this.searchResults.emit(data);
        },
        error: (error) => {
          console.error('Erreur API', error)
        }
      });
    }
  }

}
