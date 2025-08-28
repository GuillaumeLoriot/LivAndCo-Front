import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PanelStateService } from '../../../../services/utils/panel-state.service';

@Component({
  selector: 'app-nav-bar-secondary',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-bar-secondary.component.html',
  styleUrl: './nav-bar-secondary.component.scss'
})
export class NavBarSecondaryComponent {

  constructor(public panelState: PanelStateService) { }

}
