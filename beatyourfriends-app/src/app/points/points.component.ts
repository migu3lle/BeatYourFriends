import { Component, OnInit } from '@angular/core';
import { PointsService } from '../points.service';
import { BrowserStorageService } from '../storage.service';
import { Game } from '../game';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { MessageService } from '../message.service'


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  points: Points = {
    won: '',
    equal: '',
    loose: ''
  };
  activeGames: Game[];

  constructor(private pointsService: PointsService,
    private storageService: BrowserStorageService,
    private router: Router,
    private messageService: MessageService) { }

 /**
  * Sets up the points component, which displays the games of the logged in user
  * The games get fetched through the pointsServerce and are later put into the list in the html document
  * The checkbox, whether the game is playable or not gets colored in the correct color and some some changes
  * to the display of player1/ player2 points are made
  * @author Felix Gaggl
  */  
  ngOnInit() {
    let email = this.storageService.get('email');
    /*this.pointsService.getPoints(email)
    .subscribe(result => {
      this.points.won = result[0].won;
      this.points.equal = result[0].equal;
      this.points.loose = result[0].loose;
    });*/

    this.pointsService.getGames().subscribe(result => {
      console.log(result);
      
      this.activeGames = result;
      console.log("myGames are here");

      this.pointsService.getId().subscribe(result =>{
        this.storageService.set("id", result.toString());
        let i = 0;
        let playableBoxList = document.getElementsByClassName("choose");
        //playableBoxList[0].getElementsByTagName("td")[3].style.backgroundColor = "red";
  
        this.activeGames.forEach(element => {
          if(result == element.player2){
            let a = element.player1points;
            element.player1points = element.player2points;
            element.player2points = a;
          }
  
          if(result == element.player2 && element.player2status == 1 && element.round <= 3){
            playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "green";
          }else if(result == element.player2 && element.player2status == 0 && element.round <= 3){
            playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "red";
          }else if(result == element.player1 && element.player1status == 1 && element.round <= 3){
            playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "green";
          }else if(result == element.player1 && element.player1status == 0 && element.round <= 3){
            playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "red";
          }

          if(element.round >= 4){
            playableBoxList[i].getElementsByTagName("td")[4].innerHTML = "3";
            playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "white";
            playableBoxList[i].getElementsByTagName("td")[3].innerHTML = "Finished";
          }
          i++;
      });
  
      });
    });
  }
 /**
  * Method that checks whether a game can be played or not depending on the status of the game
  * If logged in player is player1 and player2status is 0 we resolve the promise and the user can play
  * If logged in player is player2 and player1status is 0 we resolve the promise and the user can play
  * If none of the above get resolved, the promise gets rejected
  * @param {number} gameId
  * @author 
  */
  checkGameActive(gameId){
    return new Promise((resolve, reject) => {
      let myPlayerId = this.storageService.get('id');
      this.activeGames.forEach(game => {
        if(game.game_id === gameId){
          //I am Player 1
          if(game.player1 === Number(myPlayerId)){
            //If Player 2 is not playing let us play
            if(game.player2status === 0){
              resolve();
            }
          }
          //I am Player 2
          else{
            //If Player 1 is not playing let us play
            if(game.player1status === 0){
              resolve();
            }
          }
          reject('game not active');
        }
      });
    })
  }

 /**
  * Method that checks whether the game is already finished or not
  * This calculation is based on the round variable of the game and if this is over 3 the game is 
  * considered finished and the promise gets rejected. If the gameround is under or equal to 3 we resolve
  * the promise and the game can be player
  * @param {number} gameId
  * @author 
  */
  checkGameNotFinished(gameId){
    return new Promise((resolve, reject) => {
      let myPlayerId = this.storageService.get('id');
      this.activeGames.forEach(game => {
        if(game.game_id === gameId){
          if(game.round <= 3){
            console.log('resolve first promise')
            resolve(gameId);
          }
          else{
            reject('game finished');
          }
        }
      });
      reject('game not found');
    })
  }
 /**
  * PlayGame Method gets called by clicking on the list in the html
  * The method first checks whether the clicked game is finished or not by calling checkGameNotFinished
  * If this check resolves posititve (game not finished) the gameId gets set into the local storage and
  * if we are player1 we get navigated to quiz1 if player2 quiz2
  * If the game if already finished or the game can currently not be played a message indicating this
  * is shown
  * @param {number} gameId 
  * @param {number} player1
  * @author Felix Gaggl 
  * @author Michael Gundacker
  */  
  playGame(gameId, player1){
    this.checkGameNotFinished(gameId)
      .then(this.checkGameActive.bind(this))
      .then(() => {
      console.log("starting game");
      this.storageService.set('gameId', gameId.toString());
      let id;
      this.pointsService.getId().subscribe(result => {
        id = result;
        console.log("id"+id);
        console.log("player1id"+player1);
    
        if(id === player1){
          this.router.navigate(['quiz']);
        }else{
          this.router.navigate(['quiz2']);
        }
      });
    })
    .catch((msg) => {
      if(msg === 'game finished'){
        this.messageService.clear();
        this.messageService.add('Dieses Spiel ist bereits beendet!');
      }
      else{
        this.messageService.clear();
        this.messageService.add('Warte bis dein Gegner fertig gespielt hat!');
      }
    });
  }
}

interface Points {
  won: string,
  equal: string,
  loose: string
}
