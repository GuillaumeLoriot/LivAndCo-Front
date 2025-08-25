import { Component } from '@angular/core';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [CommonModule,SearchBarComponent],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.scss'
})
export class AnnouncementListComponent {
answerIsOpen = false;


switchOpenClosedAnswer(){
  this.answerIsOpen = !this.answerIsOpen;
}



}
