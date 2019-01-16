import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class PwService {

  constructor(private http: HttpClient) { }

  //call api function to check if mail exists
  checkMail(email: string): Observable<User> {
    return this.http.get<User>('http://localhost:3000/api/reset/' + email);
  }

  //call api function to check if token is valid
  checkToken(token: string) {
    return this.http.get('http://localhost:3000/api/res/' + token);
  }

  //call api function to update password
  changePass(password: string, email: string) {
    let body = {password: password, email: email};
    console.log(body);
    return this.http.put<void>('http://localhost:3000/api/change', body);
  }
}
