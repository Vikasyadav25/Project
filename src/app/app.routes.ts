import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component'; 
import { ForgotPassComponent } from './pages/forgot-pass/forgot-pass.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'reset', component: ForgotPassComponent }, // Define route for sign-up
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to login by default
];

