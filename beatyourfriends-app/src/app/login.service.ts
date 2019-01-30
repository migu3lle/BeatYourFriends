import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from './storage.service';
import { NewsletterService } from './newsletter.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private storage: BrowserStorageService,
    private newsletterService: NewsletterService) {
  }

  user: User;
   //login
  doLogin(username: string, password: string) {

   const loginUrl = 'http://localhost:3000/api/loginroutes';
  
  // post to db
  this.http.post<User>(loginUrl, {email: username, pass: password})
  .subscribe(result => {
    this.user = result;

    //navigate to dashboar and set session storage
    this.router.navigate(['/dashboard']);
    this.storage.set('token', JSON.stringify(this.user));
    let email = this.user.email;
    this.storage.set('email', email);
    let first = this.user.firstname;
    this.storage.set('firstname', first);    
    let last = this.user.lastname;
    this.storage.set('lastname', last);
    //Push notification was not implemented yet
    //this.newsletterService.addPushSubscriber({sub: this.storage.get('subscription'), userToken: this.user.token}).subscribe()
  },  error => {this.handleError;
  });
}

    //logout
  doLogout(): void {
    this.storage.remove('token');
    this.router.navigate(['/login']);
  }

/**
 * Handle Http operation that failed.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error('Error doing Login: ' + error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return null;
  };
}


}
