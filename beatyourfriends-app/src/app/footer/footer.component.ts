import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }


  //Logout
  logout(): void {
    this.loginService.doLogout();
  }

}
