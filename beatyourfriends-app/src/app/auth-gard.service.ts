import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LoginService} from './login.service';
import { BrowserStorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: LoginService, private router: Router, private storage: BrowserStorageService) { }

  canActivate(): boolean {
    const user = this.storage.get('token');

    if (user === null || user === undefined) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}

