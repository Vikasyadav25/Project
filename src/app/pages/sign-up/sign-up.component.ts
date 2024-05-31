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
import { SignUp } from '../../core/models/common.model';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: '../sign-up/sign-up.component.html',
  styleUrl: '../sign-up/sign-up.component.css',
})
export class SignUpComponent  {
  signUp1: SignUp[] = [];
  signUpForm!: FormGroup;
  emailCheck: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }
  
  onSubmit() {
    if (this.signUpForm.value.name === '') {
      alert('Please Enter Name');
    } else if (this.signUpForm.value.email === '') {
      alert('Please Enter Email');
      return;
    } else if (
      this.emailCheck.includes(this.signUpForm.value.email.toLowerCase())
    ) {
      this.signUpForm.get('email')?.setValue('');
      alert('Email already exists!');
      return;
    } else if (this.signUpForm.value.password === '') {
      alert('Please Enter Password');
      return;
    } else if (this.signUpForm.value.password1 === '') {
      alert('Please Enter Confirm Password');
      return;
    } else if (
      !(this.signUpForm.value.password === this.signUpForm.value.password1)
    ) {
      this.signUpForm.get('password1')?.setValue('');
      alert('Confirm Password should be match.');
      return;
    } else {
      this.authService.register(
        this.signUpForm.value.name,
        this.signUpForm.value.email,
        this.signUpForm.value.password
      );
      this.router.navigate(['home']);
      alert('Sign Up Succesfully!');
    }
  }
}
