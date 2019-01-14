import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError, empty } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';
import { BrowserStorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient, private storage: BrowserStorageService) {
}

  doLogin(username: string, password: string) : Observable<User> {

   const loginUrl = 'http://localhost:4200/login/' + username;

  return this.http.post<User>(loginUrl, {email: username, pass: password})
  /*.pipe(
     catchError(this.handleError('doLogin', username))
  );*/}


  doLogout(): void {
    this.storage.remove('token');
    this.router.navigate(['/login']);
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
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
