import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.css'], // Corrected to styleUrls
})
export class LoginComponent {
  loginForm1: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm1 = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]), // Added email validator
      password: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  async login() {
    if (this.loginForm1.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const { email, password } = this.loginForm1.value;
    try {
      await this.authService.login(email, password);
      this.router.navigate(['home']); // Redirect to home or dashboard after login
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    // console.log(error.error.errors[0]);
    if (error instanceof FirebaseError) {
      this.handleFirebaseError(error);
    } else if (
      error.error &&
      error.error.errors &&
      Array.isArray(error.error.errors)
    ) {
      const apiError = error.error.errors[0];
      alert(apiError.message);
    } else {
      console.error('Unknown error during login', error);
      alert('An unknown error occurred. Please try again.');
    }
  }

  private handleFirebaseError(error: FirebaseError) {
    console.log(error.code);
    switch (error.code) {
      case 'auth/invalid-credential':
        alert('Invalid credentail, Please try again.');
        break;
      case 'auth/wrong-password':
        alert('The password is incorrect.');
        break;
      default:
        alert('An error occurred during login: ' + error.message);
    }
  }
}
