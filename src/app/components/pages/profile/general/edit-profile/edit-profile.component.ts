import { Component, inject } from '@angular/core';
import { UserService } from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  // editForm: FormGroup;
  // formBuilder: FormBuilder = inject(FormBuilder);
  // private userService: UserService = inject(UserService);
  // private router = inject(Router);
  // isSubmitted = false;
  // isLoading = false;
  // success = false;
  // error = false;

}
