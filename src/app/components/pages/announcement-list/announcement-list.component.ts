import { Component } from '@angular/core';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { AnnouncementListCardComponent } from "../../common/announcement-list-card/announcement-list-card.component";
import { ResultsMapComponent } from "../../common/results-map/results-map.component";


@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, AnnouncementListCardComponent, ResultsMapComponent],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.scss'
})
export class AnnouncementListComponent {
answerIsOpen = false;


switchOpenClosedAnswer(){
  this.answerIsOpen = !this.answerIsOpen;
}



}
