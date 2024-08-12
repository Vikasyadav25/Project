import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerProfileService } from '../../service/customer-profile.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ NavbarComponent,MatFormFieldModule,ReactiveFormsModule,FormsModule,HttpClientModule,MatSnackBarModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  profile:any;
  nameParts:any;
  user: any;
  account:any;
  constructor(private profileService: CustomerProfileService,private router: Router,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,private snackBar: MatSnackBar
  ) {}

  

  photoPreview: string | ArrayBuffer | null = null;

  onPhotoUpload(event: Event) {
    // const file = (event.target as HTMLInputElement).files?.[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.photoPreview = reader.result;
    //     this.account.photo = reader.result; // Base64 encoded photo
    //   };
    //   reader.readAsDataURL(file);
    // }
  }
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
  navigateToProfile() {
    this.closeMenu();
    this.router.navigate(['/home']);
  }
  

  ngOnInit(): void {

    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      this.nameParts = this.user?.displayName.split(' ');
      this.account = {
        first_name: this.nameParts[0],
        last_name: this.nameParts[1],
        email: this.user?.email,
        phone_number: '',
        address: '',
        account_type: 'Savings',
        balance: '0.00',
        adhar_card: '',
        date_of_birth: '',
        photo: null,
        branch: '',
        district: '',
        state: '',
        pincode: ''
      };
    });
    }

  onSubmit() {
    console.log('Account created:', this.account);
    this.profileService.createAccount(this.account).subscribe(
      response => {
        this.router.navigate(['/home']);
        console.log('Profile updated successfully Go Back to Home page', response);
        this.snackBar.open('You have successfully applied for Bank Account Wait for Manager Approval!', 'Close', {
          duration: 5000, // Duration in milliseconds
          verticalPosition: 'bottom', // Position at the bottom of the screen
          horizontalPosition: 'start', 
        });

      },
      error => {
        console.error('Error updating profile', error);
      }
    );
    // Send the account data to the backend API or process it as needed
  }
}
