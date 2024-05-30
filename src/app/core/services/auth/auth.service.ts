import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}
  async register(name: string, email: string, password: string) {
    console.log(name);
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(userCredential.user);
    if (userCredential.user) {
      await userCredential.user.updateProfile({ displayName: name });
    }
    return userCredential;
  }
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Logout
  logout() {
    return this.afAuth.signOut();
  }

  // Get current user
  getUser() {
    return this.afAuth.authState;
  }
}
