import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,NavbarComponent,LoginComponent,SignUpComponent
    ,ForgotPassComponent
  ],
  templateUrl: '../home/home.component.html',
  styleUrl: '../home/home.component.css',
})
export class HomeComponent {}
