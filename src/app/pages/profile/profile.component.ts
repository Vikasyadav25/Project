import {MatFormFieldModule} from '@angular/material/form-field';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerProfileService } from '../../service/customer-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [NavbarComponent,MatFormFieldModule,ReactiveFormsModule,FormsModule,HttpClientModule,MatSnackBarModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    encapsulation: ViewEncapsulation.None 
  })
export class ProfileComponent  {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  profile:any;
  nameParts:any;
  constructor(private profileService: CustomerProfileService,private router: Router,
      private fb: FormBuilder,
      private afAuth: AngularFireAuth,private snackBar: MatSnackBar
    ) {}
  user: any;
  ngOnInit(): void {

    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      console.log(this.user?.email);
      console.log(this.user?.displayName);
      this.nameParts = this.user?.displayName.split(' ');
      this.profile = {
        first_name: this.nameParts[0],
        last_name: this.nameParts[1],
        email: this.user?.email,
        phone_number: '',
        address: ''
      };

      this.profileService.onloadProfile(this.profile).subscribe(
        response => {
          this.profile = {
            first_name: this.nameParts[0],
            last_name: this.nameParts[1],
            email: this.user?.email,
            phone_number: response.status.phone_number,
            address: response.status.address
          };
          console.log('Profile updated successfully Go Back to Home page', response.status);

        },
        error => {
          console.error('Error Onload profile', error);
        }
      );

    });


  }
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
  navigateToProfile() {
    this.closeMenu();
    this.router.navigate(['/home']);
  }
  onSubmit() {
    console.log('Form Submitted', this.profile);
    if(this.profile.phone_number==null ||this.profile.phone_number===""){
      alert("Please enter the Phone Number");
      return;
    }
    if(this.profile.address==null ||this.profile.address===""){
      alert("Please enter the Full Address");
      return;
    }else{
    this.profileService.updateProfile(this.profile).subscribe(
      response => {
        console.log('Profile updated successfully Go Back to Home page', response);
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'bottom', // Position at the bottom of the screen
          horizontalPosition: 'start', 
        });
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  }
  }
}
