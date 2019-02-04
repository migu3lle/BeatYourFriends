import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './user';
 
@Injectable({
  providedIn: 'root'
})
 /**
  * Class UserService, containing CRUD operations to REST Api
  * @param email - email from local storage
  * @param id - userid from local storage
  * @param user - current user
  * @author Christina Senger
  */  
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

  getMailbyId(id: string) {
    return this.http.post(this.usersUrl + '/' + id, id);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<void>(this.usersUrl, user);
  }

  deleteUser(email: string) {
    return this.http.delete<void>(this.usersUrl + '/'  + email);
  }
}
