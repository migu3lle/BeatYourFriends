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

  ngOnInit() {
    //test if user is current logged in
    const user = this.storage.get('token');
    if (user !== null && user !== undefined) {
      this.router.navigate(['dashboard']);
    } 
  }
    
  //login
  getUserLogged(): void {
    this.loginService.doLogin(this.login.email, this.login.password)
  }

}

interface Loginform {
  email: string;
  password: string;
}



