import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControlErrorComponent } from "../../../../common/errors/form-control-error/form-control-error.component";
import { LoadingComponent } from "../../../../common/loading/loading.component";
import { CommonModule } from '@angular/common';
import User from '../../../../../models/user.interface';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlErrorComponent, LoadingComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  user: User | null = null;
  private router = inject(Router);
  isSubmitted = false;
  isLoading = false;
  success = false;
  error = false;
  errorMessage: string | null = null;


  constructor() {
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.maxLength(60)]],
      lastName: ['', [Validators.maxLength(60)]],
      email: ['', [Validators.email]],
      birthDate: ['', []],
      occupation: ['', [Validators.maxLength(50)]],
      gender: [null, []],
      billingAddress: ['', [Validators.minLength(10)]],
      phoneNumber: ['', [Validators.pattern(/^(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/)]],
    }
    );
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;

        // Je pré rempli les champs du form avec les données du user
        this.editForm.patchValue(data);

        // L'input date veut 'YYYY-MM-DD' mais je reçois une chaine ISO donc je tronque la donnée
        if (data.birthDate) {
          this.editForm.get('birthDate')?.setValue(String(data.birthDate).slice(0, 10));
        }


      },
      error: (error) => {
        console.log(error);
        // if (error.status === 401) {
        //   this.router.navigate(['/login']);
        // } else {
        //   console.log(error.satus, error.message);
        // }
      }
    });
  }


  onSubmit() {
    this.isSubmitted = true;
    // Je reinitialise les messages d'erreur si besoin
    this.error = false;
    this.success = false;

    if (this.editForm.valid) {
      this.isLoading = true;
      // Je verifie qu'il y a bien un user
      if (!this.user) return;
      const id = this.user.id;
      const changes: Partial<User> = this.editForm.value;
      // Je lui donne l'id et les donnée du form pour édition
      this.userService.edit(id, changes).subscribe({
        next: () => {
          this.isLoading = false;
          // J'affiche un message de confirmation avant redirection pour login 
          this.success = true;
          this.editForm.disable();
          setTimeout(() => this.router.navigate(['/profile']), 3000);
        },
        error: (error) => {
          // Affichage de l'erreur dans la template
          if (error.status) {
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
          }
          this.error = true;
          this.isLoading = false;
        },
      });
    }

  }

}
