import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { UserService } from '../../../services/user/user.service';
import { LoadingComponent } from "../../common/loading/loading.component";
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  isSubmitted = false;
  isLoading = false;
  token = '';

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.userService.login(this.loginForm.value).subscribe({
        next: (data) => {
          // Après l'appel api login_check j'enregistre le token reçu en local storage
          localStorage.setItem('token', data.token);
          this.isLoading = false;
          // Je passe ensuite dans mon service qui vérifie le token et enregistre l'état de la connexion puis redirige vers le profil
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          this.authService.verifyAuth(returnUrl);
        },
        error: (error) => {

          console.log(error)
          this.isLoading = false;

        },
      });
    }


  }


  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return Boolean(field && field.invalid && (field.dirty || field.touched || this.isSubmitted));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['email']) return `${fieldName} doit être au format email`;
      if (field.errors['required']) return `${fieldName} est obligatoire`;
      if (field.errors['minlength']) { return `Minimum ${field.errors['minlength'].requiredLength} caractères`; }
    }
    return '';
  }

}

