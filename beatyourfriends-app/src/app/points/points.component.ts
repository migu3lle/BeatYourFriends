import { Component, OnInit } from '@angular/core';
import { PointsService } from '../points.service';
import { BrowserStorageService } from '../storage.service';
import { Game } from '../game';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { resolve } from 'url';


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
    private gameService: GameService) { }

  ngOnInit() {
    let email = this.storageService.get('email');
    this.pointsService.getPoints(email)
    .subscribe(result => {
      this.points.won = result[0].won;
      this.points.equal = result[0].equal;
      this.points.loose = result[0].loose;
    });

    this.pointsService.getGames().subscribe(result => {
      console.log(result);
      
      this.activeGames = result;
      console.log("myGames are here");
    });

    this.pointsService.getId().subscribe(result =>{
      this.storageService.set("id", result.toString());
      let i = 0;
      let playableBoxList = document.getElementsByClassName("choose");
      playableBoxList[0].getElementsByTagName("td")[3].style.backgroundColor = "red";

      this.activeGames.forEach(element => {
        if(result == element.player2){
          let a = element.player1points;
          element.player1points = element.player2points;
          element.player2points = a;
        }

        if(result == element.player2 && element.player2status == 1){
          playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "green";
        }else if(result == element.player2 && element.player2status == 0){
          playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "red";
        }else if(result == element.player1 && element.player1status == 1){
          playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "green";
        }else if(result == element.player1 && element.player1status == 0){
          playableBoxList[i].getElementsByTagName("td")[3].style.backgroundColor = "red";
        }
        i++;
    });

    });



  }
 

  checkGameActive(gameId){
    return new Promise((resolve, reject) => {
      console.log('promise in checkGameActive');
      for(let game of this.activeGames){
        console.log('check game')
        if(game.game_id === gameId){
          console.log('Found current gameID in active games: ' + gameId);
          this.pointsService.getId().subscribe(myPlayerID => {

            //I am player 1 of this game
            if(game.player1 === myPlayerID){
              this.pointsService.getPlayer2StatusByGame(gameId)
              .subscribe(result => {
              console.log("player2 status is: " +result[0].player2status);
              let player2Stat = result[0].player2status;
              //if player2 is not playing let us play
              if (player2Stat === 0) {
                console.log('return true')
                resolve();
              } else {
                console.log('return false')
                reject();
              }
            });
            }
            //I am player 2 of this game
            else{
              this.pointsService.getPlayer1StatusByGame(gameId)
              .subscribe(result => {
              console.log("player1 status is: " +result[0].player1status);
              let player1Stat = result[0].player1status;
              //if player1 is not playing let us play
              if (player1Stat === 0) {
                console.log('return true')
                resolve();
              } else {
                console.log('return false')
                reject();
              }
            });
            }
          })
        }
      }
    })
  }

  checkGameActive(gameId){
    return new Promise((resolve, reject) => {
      console.log('promise in checkGameActive');
      for(let game of this.activeGames){
        console.log('check game')
        if(game.game_id === gameId){
          console.log('Found current gameID in active games: ' + gameId);
          this.pointsService.getId().subscribe(myPlayerID => {

            //I am player 1 of this game
            if(game.player1 === myPlayerID){
              this.pointsService.getPlayer2StatusByGame(gameId)
              .subscribe(result => {
              console.log("player2 status is: " +result[0].player2status);
              let player2Stat = result[0].player2status;
              //if player2 is not playing let us play
              if (player2Stat === 0) {
                console.log('return true')
                resolve();
              } else {
                console.log('return false')
                reject();
              }
            });
            }
            //I am player 2 of this game
            else{
              this.pointsService.getPlayer1StatusByGame(gameId)
              .subscribe(result => {
              console.log("player1 status is: " +result[0].player1status);
              let player1Stat = result[0].player1status;
              //if player1 is not playing let us play
              if (player1Stat === 0) {
                console.log('return true')
                resolve();
              } else {
                console.log('return false')
                reject();
              }
            });
            }
          })
        }
      }
    })
  }

  playGame(gameId, player1){
    let promise = this.checkGameActive(gameId);
    console.log('start promise')
    promise.then(() => {
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
    .catch(function(){
      alert('Warte bis dein Gegner fertigespielt hat!');
    });
  }
}

interface Points {
  won: string,
  equal: string,
  loose: string
}
