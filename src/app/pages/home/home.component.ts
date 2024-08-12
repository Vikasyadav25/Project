import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPassComponent,
    FormsModule,
  ],
  templateUrl: '../home/home.component.html',
  styleUrl: '../home/home.component.css',
})
export class HomeComponent {

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  user: any = null;

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
  navigateToProfile() {
    this.closeMenu();
    this.router.navigate(['/profile']);
  }
  navigateToCreateAccount() {
    this.closeMenu();
    this.router.navigate(['/accountCreate']);
  }
}
