import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-announcement-list-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './announcement-list-card.component.html',
  styleUrl: './announcement-list-card.component.scss'
})
export class AnnouncementListCardComponent {

}
