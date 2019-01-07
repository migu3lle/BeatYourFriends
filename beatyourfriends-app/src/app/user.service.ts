import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:3000/users/';
  constructor( 
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + id);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<void>(this.usersUrl + user.userid, user);
  }

  deleteUser(id: number) {
    return this.http.delete<void>(this.usersUrl + id);
  }
}
