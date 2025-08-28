import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { PanelStateService } from '../../../../../services/utils/panel-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './owner-dashboard-panel.component.html',
  styleUrl: './owner-dashboard-panel.component.scss'
})
export class OwnerDashboardPanelComponent {
  constructor(public panelState: PanelStateService) { }
}
