import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: '../navbar/navbar.component.html',
  styleUrl: '../navbar/navbar.component.css',
})
export class NavbarComponent {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  user: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
      this.closeMenu();
    });
  }
  navigateToProfile() {
    this.closeMenu();
    this.router.navigate(['/profile']);
  }
  homePage(){
    this.closeMenu();
    this.router.navigate(['/home']);
  }
}
