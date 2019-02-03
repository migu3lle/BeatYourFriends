import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { PointsService } from '../points.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../storage.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
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

/** Class representing a QuizComponent. */
export class QuizComponent implements OnInit {

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

  /**
    * Create a QuizComponent.
    * @param {GameService} gameService - The injected gameService object.
    * @param {PointsService} pointsService - The injected pointsService object.
    * @param {BrowserStorageService} storageService - The injected browserStorageService object.
    * @param {Router} router - The injected router object.
    * @author Christina Senger, Felix Gaggl, Michael Gundacker
  */
  constructor(private gameService: GameService,
    private pointsService: PointsService,
    private router: Router,
    private storageService: BrowserStorageService) { }

  /**
    * Called on init of quiz component
    * Checks the player's status and calls get Questions 
    * or navigates to game component if game (rounds == 3)
    * @author Christina Senger, Felix Gaggl, Michael Gundacker
  */
  ngOnInit() {
    if (this.ind.o <= 3) {
    //get player2s id
    let player2id = this.storageService.get('player2id');

    //get player 2s game status
    this.gameService.getPlayStat2()
    .subscribe(result => {
      console.log("player2 status is: " +result[0].player2status);
      let player2Stat = result[0].player2status;


      //if player2 is not playing load questions
      if (player2Stat === 0) {
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

  /**
    * Loads new question with 3 answers for the current turn
    * or navigates to game component if 3 questions have been loaded already (turn finished)
    * @author Christina Senger, Felix Gaggl, Michael Gundacker
  */
  getQ() {
    //test if already 3 question
    if (this.ind.i <= 3) {

    //call game service
    let gameid = this.storageService.get('gameId');
    this.gameService.getQuestion(this.ind.i, gameid)
    .subscribe(result => {
      console.log("result: " + result[0]);
      this.questions.question = result[0].Frage;
      this.questions.a1 = result[0].Antwort1;
      this.questions.a2 = result[0].Antwort2;
      this.questions.a3 = result[0].Antwort3;
      this.questions.token = result[0].token;

      this.ind.i++;

    });
  } else {
    //change player status
    let player2id = this.storageService.get('player2id');
    this.gameService.updatePlayStat(player2id)
    .subscribe(() => {
      console.log("navige to dashboard");
      this.router.navigate(['game']);
    });
   
    // --> TODO SEND NOTIFICATION
  };
  }

  /**
    * Loads the right answer for the current question
    * @param {index} any - the index of the chosen answer (1-3)
    * @param {token} String - the questions.token field
    * @author Christina Senger, Felix Gaggl, Michael Gundacker
  */
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
        console.log('Right');

        //get Mails by Id
          this.pointsService.storePoint1(index).subscribe(result => {
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
