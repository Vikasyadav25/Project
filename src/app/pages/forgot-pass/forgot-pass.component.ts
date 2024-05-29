import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
 
@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,NavbarComponent],
  templateUrl: '../forgot-pass/forgot-pass.component.html',
  styleUrl: '../forgot-pass/forgot-pass.component.css',
})
export class ForgotPassComponent {}
