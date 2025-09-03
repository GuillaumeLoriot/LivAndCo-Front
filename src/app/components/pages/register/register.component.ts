import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { LoadingComponent } from '../../common/loading/loading.component';
import { FormControlErrorComponent } from '../../common/errors/form-control-error/form-control-error.component';
import { UserService } from '../../../services/user/user.service';
import { passwordMatchValidator } from '../../../validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingComponent, FormControlErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  isSubmitted = false;
  isLoading = false;
  success = false;
  error = false;

  constructor() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required] }, { validators: passwordMatchValidator }
    );
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this.isLoading = true;
      // Ici, je déstructure les data du form : je prend la clé "confirmPassword" à part et met TOUTES les autres propriétés dans "requestBody"
      // → requestBody est une copie superficielle de this.registerForm.value SANS "confirmPassword" (l’objet d’origine n’est pas modifié).
      const { confirmPassword, ...requestBody } = this.registerForm.value as any;

      this.userService.register(requestBody).subscribe({
        next: () => {
          this.isLoading = false;
          // J'affiche un message de confirmation avant redirection pour login 
          this.success = true;             
          this.registerForm.disable();     
          setTimeout(() => this.router.navigate(['/login']), 1800); 
        },
        error: (error) => {
          console.log(error)
          this.isLoading = false;
          this.error = true;
        },
      });
    }

  }


}
