import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-messages-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './messages-panel.component.html',
  styleUrl: './messages-panel.component.scss'
})
export class MessagesPanelComponent {

}
