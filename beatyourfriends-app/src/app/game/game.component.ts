import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Question } from '../question';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameId: number; //current game ID
  user: User; //current user playing
  questions : Question[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private gameService: GameService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
    this.getAllQuestions();
    document.getElementsByClassName("waitLabel")[0].remove();
  }


  getAllQuestions() {
    return this.gameService.getQuestions(window.location.href.split("/")[4])
               .subscribe(
                 questions => {
                  console.log(questions);
                  this.questions = questions;
                 }
                );
  }


}
