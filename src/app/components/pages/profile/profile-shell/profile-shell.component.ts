import { Component } from '@angular/core';
import { NavBarSecondaryComponent } from "../../../layout/profile/nav-bar-secondary/nav-bar-secondary.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-profile-shell',
  standalone: true,
  imports: [NavBarSecondaryComponent, RouterOutlet],
  templateUrl: './profile-shell.component.html',
  styleUrl: './profile-shell.component.scss'
})
export class ProfileShellComponent {

}
