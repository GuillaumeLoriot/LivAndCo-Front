import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { PanelStateService } from '../../../../../services/utils/panel-state.service';

@Component({
  selector: 'app-profile-panel',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './profile-panel.component.html',
  styleUrl: './profile-panel.component.scss'
})
export class ProfilePanelComponent {

  constructor(public panelState: PanelStateService) { }

  // closeIfMobile() {
  //   if (window.innerWidth < 768) this.panelState.close();
  // }

}
