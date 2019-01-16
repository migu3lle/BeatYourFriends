import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PwService } from '../pw.service'
import { BrowserStorageService } from '../storage.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  passw: Passform = {
    pass: '',
    confirm: '',
    email: ''
  };

  val: Validation = {
    message: ''
  }



  constructor(private pwService: PwService, 
    private router: Router,
    private storageService: BrowserStorageService) { }

  ngOnInit() {
    //split token from url
    let pathArry = window.location.pathname.split('/');
    let token = pathArry[2];

    //send token to pwService
    this.pwService.checkToken(token)
    .subscribe (result => {
      //check if token was true
      this.val.message = JSON.stringify(result);
      console.log(this.val.message);
      if (this.val.message !== "true") {
        //redirect to login
        this.router.navigate(['login']);
        alert('Token ist nicht gültig!')
      }
      else {
        console.log('Passwort eingeben!');
      }
    });
  }

  checkPassw() {
    //if both values are the same call pwService
    if (this.passw.pass === this.passw.confirm) {
      this.pwService.changePass(this.passw.pass, this.passw.email)
      .subscribe (result => {
        let res = result;
        alert('Dein Passwort wurde upgedated!')
      });
    } else {
      alert('Passwörter müssen übereinstimmen!')
    }
  }

}

interface Passform {
  pass: string;
  confirm: string;
  email: string;
}

interface Validation {
  message: string;
}
