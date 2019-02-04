import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { BrowserStorageService } from '../storage.service';
import { GameService } from '../game.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
/** class representing a */
export class FriendsComponent implements OnInit {

  users: User[]; 
  shownUsers: User[]; 

  constructor(private userService: UserService, private storgageService: BrowserStorageService, private gameService: GameService, private router: Router) { }

  
  /**
  * Method calls the userService to get all the possible users, after the result is returned
  * the user that is logged in gets removed from this array and the result is saved into shownUsers[]
  * @author Christina Senger
  */
  ngOnInit() {
    this.getAllUsers();
  }
  
  
  /**
  * Method calls the userService to get all the possible users, after the result is returned
  * the user that is logged in gets removed from this array and the result is saved into shownUsers[]
  * @author Christina Senger
  */
  getAllUsers() {

    //fetchh from db
    return this.userService.getAllUsers()
    .subscribe(
      users => {
        this.users = users
        
        let mail = this.storgageService.get('email');
        
        //check for current logged user to not display
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].email === mail) {              
              this.users.splice(i,1);
              this.shownUsers = this.users;
          }
        }
      }
    );
  }

  requestNewGame(id: String){
    console.log("requesting new game!");
    console.log(id);
    let token = this.storgageService.get('token');
    return this.gameService.createGameForUser(token, id)
      .subscribe(id => {
        console.log('Received new game id: ' + id);
        this.router.navigate(['quiz']);
      })
  }



}
