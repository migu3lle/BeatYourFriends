import { Component, OnInit } from '@angular/core';
import { PointsService } from '../points.service';
import { BrowserStorageService } from '../storage.service';
import { Game } from '../game';
import { Router } from '@angular/router';


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
    private router: Router) { }

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
 

  playGame(gameId, player1){
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
   
    
   
}

}

interface Points {
  won: string,
  equal: string,
  loose: string
}
