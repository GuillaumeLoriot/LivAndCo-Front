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


  constructor() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', Validators.required] }, { validators: passwordMatchValidator }
    }
    );
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.userService.register(this.registerForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.isLoading = false;

        },
        error: (error) => {

          console.log(error)
          this.isLoading = false;

        },
      });
    }

  }


}
