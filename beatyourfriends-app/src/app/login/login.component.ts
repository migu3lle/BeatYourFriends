import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
/** Class representing a LoginComponent. */
export class LoginComponent implements OnInit {

  User = new User;
  login: Loginform = {
    email: '',
    password: ''
  };
  
  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private storage: BrowserStorageService) {   
  }
  /**
  * Method checks if there is a user that is currently logged in
  * If there is a user logged in the router navigated to the dashboard (Page where friends are displayed)
  * @author Christina Senger
  */
  ngOnInit() {
    //test if user is current logged in
    const user = this.storage.get('token');
    if (user !== null && user !== undefined) {
      this.router.navigate(['dashboard']);
    } 
  }
    
  /**
  * Method that is called by clicking login in the html, loginService gets called with the
  * parameters that are typed in by the user into the login form
  * @author Christina Senger
  */
  getUserLogged(): void {
    this.loginService.doLogin(this.login.email, this.login.password)
  }

}

interface Loginform {
  email: string;
  password: string;
}



