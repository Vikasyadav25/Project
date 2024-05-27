import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component'; // Import your sign-up component
import { NgModule } from '@angular/core';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'reset', component: ForgotPassComponent }, // Define route for sign-up
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
];

