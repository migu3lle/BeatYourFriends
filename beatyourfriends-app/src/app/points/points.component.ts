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

/** Class representing a PointsComponent. */
export class PointsComponent implements OnInit {

  points: Points = {
    won: '',
    equal: '',
    loose: ''
  };
  activeGames: Game[];

  /**
    * Create a PointsComponent.
    * @param {MessageService} messageService - The injected messageService object.
    * @param {PointsService} pointsService - The injected pointsService object.
    * @param {BrowserStorageService} storageService - The injected browserStorageService object.
    * @param {Router} router - The injected router object.
    * @author Felix Gaggl, Michael Gundacker
  */
  constructor(private pointsService: PointsService,
    private storageService: BrowserStorageService,
    private router: Router,
    private messageService: MessageService) { }

  /**
    * Called on init of points component
    * Loads the games assigned to the current player and does some styling
    * @author Felix Gaggl, Michael Gundacker
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
    * Checks if it is the current player's turn
    * @param {gameId} number - The gameID to check the player's status for
    * @returns {Promise} - Promise resolves on current player's turn, rejects if not
    * @author Michael Gundacker
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
    * Check if given game is already finished (based on round count)
    * @param {gameId} number - The gameID to check the status for
    * @returns {Promise} - Promise resolves on game not finished, rejects if finished
    * @author Michael Gundacker
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
    * Starts a turn for the current player if allowed
    * The player chooses the game from points component, 
    * then we navigate to quiz component if player is allowed to play
    * @param {gameId} number - The id of the game the player wants to play
    * @author Felix Gaggl, Michael Gundacker
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
