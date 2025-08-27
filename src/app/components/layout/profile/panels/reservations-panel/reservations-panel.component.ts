import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-reservations-panel',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './reservations-panel.component.html',
  styleUrl: './reservations-panel.component.scss'
})
export class ReservationsPanelComponent {

}
