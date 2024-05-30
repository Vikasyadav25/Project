import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupService } from '../../core/services/signup/signup.service';
import { SignUp } from '../../core/models/common.model';

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
export class SignUpComponent implements OnInit {
  signUp1: SignUp[] = [];
  signUpForm!: FormGroup;
  emailCheck: any[] = [];

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.signupService
      .getSignUpDetail()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          console.log(data);
          data.forEach((change) => {
            const payload = change.payload.val();

            if (payload && payload.email) {
              this.emailCheck.push(payload.email.toLowerCase());
            }
          });
          console.log(this.emailCheck);
        },
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
      this.signupService.addSignUpDeatils(this.signUpForm.value);
      this.router.navigate(['login']);
      alert('Sign Up Succesfully!');
    }
  }
}
