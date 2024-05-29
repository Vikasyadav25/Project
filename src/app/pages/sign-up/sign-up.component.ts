import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,NavbarComponent],
  templateUrl: '../sign-up/sign-up.component.html',
  styleUrl: '../sign-up/sign-up.component.css',
})
export class SignUpComponent {}
