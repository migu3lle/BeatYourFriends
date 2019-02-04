import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../storage.service';
import { GameService } from '../game.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  mess: Message = {
    message: ''
  }

  constructor(private storageService: BrowserStorageService,
    private gameService: GameService,
    private userService: UserService) { }

  ngOnInit() {
  }

  /**
  * fetch players and their points from db and write message depending on who is logged in and who has won
  * @author Christina Senger
  */
  requestPoints(){
    return this.gameService.getWinner()
      .subscribe(result => {
        //fetch players and their points
        let player1points = result[0].player1points;
        let player2points = result[0].player2points;
        let player1 = result[0].player1;
        let player2 = result[0]. player2;

        //fetch players mail
        this.userService.getMailbyId(player1)
          .subscribe(res => {
            let email1 = res[0].email; 
            this.userService.getMailbyId(player2)
          .subscribe(res => {
            let email2 = res[0].email;
            let checkmail = this.storageService.get('email');

            //player1 has won and is logged
            if (player1points > player2points && email1 === checkmail) {
              this.gameService.storeWon(email1, email2);
              this.mess.message = 'Gratulation! Du hast gewonnen!';
          } else {
            //player1 has won and player2 is logged
            if (player1points > player2points && email2 === checkmail) {
              this.gameService.storeWon(email1, email2);
              this.mess.message = 'Du hast leider verloren!';
            } else {
              //both have the same points
              if (player1points === player2points) {
                this.gameService.storeEqual(email1, email2);
                this.mess.message = 'Unenschieden!';
              } else {
                //player 1 has loose and is logged
                if (player1points < player2points && email1 === checkmail) {
                  this.gameService.storeLooser(email1, email2);
                  this.mess.message = 'Du hast leider verloren!';
              } else {
                if (player1points < player2points && email2 === checkmail) {
                  this.gameService.storeLooser(email1, email2);
                  this.mess.message = 'Gratulation! Du hast gewonnen!';
                }
              }
            }
          }
        }
      });
    });
  });
}
}

interface Message {
  message: string
}
