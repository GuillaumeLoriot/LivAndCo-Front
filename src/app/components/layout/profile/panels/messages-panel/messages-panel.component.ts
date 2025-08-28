import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PanelStateService } from '../../../../../services/utils/panel-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages-panel',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './messages-panel.component.html',
  styleUrl: './messages-panel.component.scss'
})
export class MessagesPanelComponent {
 constructor(public panelState: PanelStateService) { }
}
