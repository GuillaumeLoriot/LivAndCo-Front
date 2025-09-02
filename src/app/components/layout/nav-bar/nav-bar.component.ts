import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent{

  authService = inject(AuthService);
  isOpen = false;


  toggleNav() {
    this.isOpen = !this.isOpen;
  }

  closeNav() {
    this.isOpen = false
  }

}
