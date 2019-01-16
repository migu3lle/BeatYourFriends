import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { GameService } from '../game.service';
import { BrowserStorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users: User[]; 

  constructor(
    private userService: UserService, 
    private gameService: GameService, 
    private storage: BrowserStorageService,
    private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.userService.getAllUsers()
               .subscribe(
                 users => {
                  console.log(users);
                  this.users = users
                 }
                );
  }

  requestNewGame(id: String){
    console.log("requesting new game!");
    console.log(id);
    let token = this.storage.get('token');
    return this.gameService.createGameForUser(token, id)
      .subscribe(id => {
        console.log('Received new game id: ' + id);
        this.router.navigate(['game/' + id]);
      })
  }



}
