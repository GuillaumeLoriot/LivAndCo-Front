import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { PanelStateService } from '../../../../../services/utils/panel-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations-panel',
  standalone: true,
  imports: [CommonModule ,RouterLink, RouterLinkActive],
  templateUrl: './reservations-panel.component.html',
  styleUrl: './reservations-panel.component.scss'
})
export class ReservationsPanelComponent {
  constructor(public panelState: PanelStateService) { }
}
