import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css',
})
export class ForgotPassComponent {}
