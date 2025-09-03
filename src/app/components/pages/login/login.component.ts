import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { UserService } from '../../../services/user/user.service';
import { LoadingComponent } from "../../common/loading/loading.component";
import { AuthService } from '../../../services/user/auth.service';
import { FormControlErrorComponent } from "../../common/errors/form-control-error/form-control-error.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingComponent, FormControlErrorComponent],
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

}

