import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User;
  login: Loginform = {
    email: '',
    password: ''
  };
  constructor(private loginService: LoginService, private router: Router, private storage: BrowserStorageService) {   }

  ngOnInit() {
    const user = this.storage.get('token');
    if (user !== null && user !== undefined) {
      this.router.navigate(['dashboard']);
      this.storage.set('token', JSON.stringify(this.user));
    } 
  }
    

getUserLogged(): void {
this.loginService.doLogin(this.login.email, this.login.password)
    .subscribe(result => {
      console.log('yes');
      this.user = result;
      this.router.navigate(['dashboard']);
      this.storage.set('token', JSON.stringify(this.user));
    },  error => {console.log(this.user);
    });

  }

}
interface Loginform {
  email: string;
  password: string;
}



