import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PanelStateService } from '../../../../services/utils/panel-state.service';
import { AuthService } from '../../../../services/user/auth.service';

@Component({
  selector: 'app-nav-bar-secondary',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-bar-secondary.component.html',
  styleUrl: './nav-bar-secondary.component.scss'
})
export class NavBarSecondaryComponent {

  constructor(public panelState: PanelStateService) { }

  auth = inject(AuthService);

  // Vérifie si le user connecter à le rôle recherché
  hasRole(role: string): boolean {
    return this.auth.roles.includes(role);
  }

}
