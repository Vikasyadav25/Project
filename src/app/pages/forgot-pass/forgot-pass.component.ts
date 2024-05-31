import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
 
@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: '../forgot-pass/forgot-pass.component.html',
  styleUrl: '../forgot-pass/forgot-pass.component.css',
})
export class ForgotPassComponent {
  forgotPasswordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  async submit() {
    if (this.forgotPasswordForm.invalid) {
      alert('Please enter a valid email address.');
      return;
    }
    const { email } = this.forgotPasswordForm.value;
    try {
      await this.authService.forgotPassword(email);
      this.router.navigate(['login']);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      console.error('Error sending password reset email', error);
      alert('Error sending password reset email: ' + error.message);
    }
  }
}
