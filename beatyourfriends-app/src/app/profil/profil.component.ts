import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { BrowserStorageService} from '../storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user = new User();

  //class to be shown in form in order to call update with 
  //to input values
  shownUser: User = {
    firstname: '',
    lastname: '',
    email: '',
    userid: 1,
    token: '',
    password:''
  };

  submitted = false;
  message: string;

  constructor(
    private userService: UserService,
    private browserStorage: BrowserStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //get values from local storage
    let email = this.browserStorage.get('email');
    let lastn = this.browserStorage.get('lastname');
    let firstn = this.browserStorage.get('firstname');

    this.shownUser.firstname = firstn;
    this.shownUser.lastname = lastn;
    this.shownUser.email = email;

    //get user from db
    this.userService.getUser(email)
      .subscribe(user => {
      this.user = user;
      });
  }

//test method
bStorage(): void {
console.log(this.user);
console.log(this.shownUser);
}
  
  //call update method
  update(): void {
    this.submitted = true;
    this.userService.updateUser(this.shownUser)
        .subscribe(result => {
          this.message = "Dein Profil ist updated";
          this.browserStorage.set('firstname', this.shownUser.firstname)
          this.browserStorage.set('lastname', this.shownUser.lastname)
          this.browserStorage.set('email', this.shownUser.email)
          alert('Dein Profil wurde upgedated'!);
        });
  }
 
  //call delete method
  delete(): void {
    this.submitted = true;
    this.userService.deleteUser(this.user[0].email)
        .subscribe(result => {
        this.message = "Dein Profil wurde gelöscht";
        alert('Dein Profil wurde gelöscht!');
        //log user out
        this.browserStorage.remove('token');
        this.router.navigate(['/login']);
        });
  }

}



