import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.scss'
})
export class AnnouncementListComponent {

}
