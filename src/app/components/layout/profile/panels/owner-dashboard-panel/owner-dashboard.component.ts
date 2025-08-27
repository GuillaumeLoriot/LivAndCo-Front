import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './owner-dashboard-panel.component.html',
  styleUrl: './owner-dashboard-panel.component.scss'
})
export class OwnerDashboardPanelComponent {

}
