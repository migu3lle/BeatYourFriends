import { Component, OnInit } from '@angular/core';
import { PwService } from '../pw.service';
import { User } from '../user';
import { BrowserStorageService } from '../storage.service';

@Component({
  selector: 'app-password-fg',
  templateUrl: './password-fg.component.html',
  styleUrls: ['./password-fg.component.css']
})
/**
* call pwService with input email
* @author Christina Senger
*/
export class PasswordFgComponent implements OnInit {

  user = new User;
  forgot: Forgotform = {
    email: ''
  };

  constructor(private pwService: PwService, private storageService: BrowserStorageService) { }

  ngOnInit() {
  }

  sendMail(): void {
    this.pwService.checkMail(this.forgot.email)
    .subscribe(result => {
      result = result;
      });
  }
}

interface Forgotform {
  email: string;
}
