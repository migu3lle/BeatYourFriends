import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { BrowserStorageService } from '../storage.service';
import { PointsService } from '../points.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-quiz2',
  templateUrl: './quiz2.component.html',
  styleUrls: ['./quiz2.component.css'],
  animations: [
    // animation triggers go here
    trigger('colorAnswer', [
      state('unknown', style({
        backgroundColor: 'teal'
      })),
      state('correct', style({
        backgroundColor: 'limegreen'
      })),
      transition('unknown => correct', [
        animate('0.3s 600ms')
      ]),
    ]),
  ]
})
export class Quiz2Component implements OnInit {

  //Variable to colorize correct Answer
  isCorrect = 0;

  questions: Questions = {
    question: '',
    a1: '',
    a2: '',
    a3: '',
    token: ''
  };

  ind: Counter = {
    i: 1,
    o: 1
  }

  constructor(private gameService: GameService,
    private storageService: BrowserStorageService,
    private router: Router,
    private pointsService: PointsService) { }

  ngOnInit() {

    if (this.ind.o <= 3) {
    //get player2s id
    let player2id = this.storageService.get('player2id');

    //get player 2s game status
    this.gameService.getPlayStat1()
    .subscribe(result => {
      console.log(result[0].player1status);
      let player1Stat = result[0].player1status;


      //if player2 is not playing load questions
      if (player1Stat === 0) {
        this.ind.o++;
        this.getQ();

        //if player 2 is playing you have to wait
      } else {
        alert('Warte bis dein Gegner fertig gespielt hat!')
      }
    });
  } else {
    this.router.navigate['game'];
  }
  }

  getQ() {
    //test if already 3 question
    if (this.ind.i <= 3) {

    //call game service
    let gameid = this.storageService.get('gameId');
    this.gameService.getQuestion(this.ind.i, gameid)
    .subscribe(result => {
      this.questions.question = result[0].Frage;
      this.questions.a1 = result[0].Antwort1;
      this.questions.a2 = result[0].Antwort2;
      this.questions.a3 = result[0].Antwort3;
      this.questions.token = result[0].token;

      this.ind.i++;

    });
  } else {
    this.gameService.updateRound(this.storageService.get('gameId')).subscribe(()=>{
      console.log("round changed - advance");
    });
    //change player status
    let player2id = this.storageService.get('player2id');
    this.gameService.updatePlayStat(player2id)
    .subscribe(() => {
      this.router.navigate(['game']);
    });
    
    // --> SEND NOTIFICATION
  };
  }

  //Fetch answer
  getA(index: any, token: string) {
    let answerDivs = document.getElementsByClassName('answer');
    answerDivs[index-1].setAttribute('style', 'border: 4px solid black;')
    this.gameService.getAnswer(token)
    .subscribe(result => {

      //check if answer was correct
      let rightIndex = result[0].Richtig;
      this.isCorrect = rightIndex;
      console.log(index);
      console.log(result[0].Richtig);
      if (index == rightIndex) {
        console.log('You get 1 point!');

        //get Mails by Id
          
          this.pointsService.storePoint2(index).subscribe(result => {
            console.log("idk");
          });
          setTimeout(() => {
            this.isCorrect = 0;
            answerDivs[index-1].removeAttribute('style');
            this.getQ();
          }, 2000);
      } else {
        setTimeout(() => {
          this.isCorrect = 0;
          answerDivs[index-1].removeAttribute('style');
          this.getQ();
        }, 2000);
      }
    });
  }

}

interface Questions {
  question: string,
  a1: string,
  a2: string,
  a3: string,
  token: string
}

interface Counter {
  i: number,
  o: number
}
