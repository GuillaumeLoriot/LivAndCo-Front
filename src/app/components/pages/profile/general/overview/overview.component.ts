import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user/user.service';
import { Router } from '@angular/router';
import User from '../../../../../models/user.interface';
import { enableAuthContext } from '../../../../../interceptors/authentification/auth.interceptor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  userService: UserService = inject(UserService);
  private router = inject(Router)
  user: User | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => { this.user = data; this.isLoading = false; console.log(this.user) },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
        // if (error.status === 401) {
        //   this.router.navigate(['/login']);
        // } else {
        //   console.log(error.satus, error.message);
        // }
      }
    });
  }
}
