import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(public routor: Router) {}
  signUp() {
    console.log('jel');
    this.routor.navigate(['/signup'], {});
  }
}
