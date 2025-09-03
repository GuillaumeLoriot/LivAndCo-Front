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
      birthDate: ['', [Validators.required]],
      occupation: ['', [Validators.required, Validators.maxLength(50)]],
      gender: [null, [Validators.required]],
      billingAddress: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required] }, { validators: passwordMatchValidator }
    );
  }


  onSubmit() {
    this.isSubmitted = true;
    // Je reinitialise les messages d'erreur si besoin
    this.error = false;
    this.success = false;
    this.registerForm.markAllAsTouched();
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
          setTimeout(() => this.router.navigate(['/login']), 3000); 
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
