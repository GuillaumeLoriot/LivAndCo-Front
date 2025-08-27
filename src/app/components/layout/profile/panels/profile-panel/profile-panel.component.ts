import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-panel.component.html',
  styleUrl: './profile-panel.component.scss'
})
export class ProfilePanelComponent {

}
