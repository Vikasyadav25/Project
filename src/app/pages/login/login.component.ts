// this is file for login.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,NavbarComponent],
  templateUrl: '../login/login.component.html',
  styleUrl: '../login/login.component.css',
})
export class LoginComponent {

}
