import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './user';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:3000/api/user';
  constructor( 
    private http: HttpClient, private user: User
  ) { }


  //CRUD operations
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(email: string) {
    return this.http.get<User>(this.usersUrl + '/' + email);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<void>(this.usersUrl, user);
  }

  deleteUser(email: string) {
    return this.http.delete<void>(this.usersUrl + '/'  + email);
  }
}
