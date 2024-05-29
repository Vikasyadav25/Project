import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { SignUp } from '../../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private dbPath = '/signup';
  signupRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.signupRef = db.list(this.dbPath);
  }
  getSignUpDetail() {
    return this.signupRef;
  }
  getSignup(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }
  addSignUpDeatils(signup: SignUp) {
    this.signupRef.push(signup);
  }
  updateSignUpDeatils(key: string, signup: SignUp) {
    this.signupRef.update(key,signup);
  }
  deleteSignUpDeatils(key:string) {
    this.signupRef.remove(key);
  }
}
