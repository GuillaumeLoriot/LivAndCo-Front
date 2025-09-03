import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user/user.service';
import { Router } from '@angular/router';
import User from '../../../../../models/user.interface';
import { enableAuthContext } from '../../../../../interceptors/authentification/auth.interceptor';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../../common/loading/loading.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  userService: UserService = inject(UserService);
  private router = inject(Router)
  user: User | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  error = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => { this.user = data; this.isLoading = false;},
      error: (error) => {
        // Affichage de l'erreur dans la template
        if (error.status) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
        this.error = true;
        this.isLoading = false;
      }
    });
  }
}
