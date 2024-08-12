import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {
  private apiUrl1 = "http://localhost:8082/customers/CustomerUpdate"; // Replace with your API endpoint
  private apiUrl2 = "http://localhost:8082/customers/CustomerOnload";
  private apiUrl3 = "http://localhost:8082/account/createAccount";

  constructor(private http: HttpClient) { }
   httpOption={
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  updateProfile(profileData: any): Observable<any> {
    return this.http.post(this.apiUrl1, profileData );
  }
  onloadProfile(profileData: any): Observable<any> {
    return this.http.post(this.apiUrl2, profileData );
  }
  createAccount(profileData: any): Observable<any> {
    return this.http.post(this.apiUrl3, profileData );
  }
}
