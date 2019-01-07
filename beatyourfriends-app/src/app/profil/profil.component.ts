import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';
 
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user = new User() ;
  submitted = false;
  message: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  update(): void {
    this.submitted = true;
    this.userService.updateUser(this.user)
        .subscribe(() => this.message = "Dein Profil ist updated");
  }
 
  delete(): void {
    this.submitted = true;
    this.userService.deleteUser(this.user.userid)
        .subscribe(()=> this.message = "Dein Profil wurde gelöscht");
  }
 
  goBack(): void {
    this.location.back();
  }

}

