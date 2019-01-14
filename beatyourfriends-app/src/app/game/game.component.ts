import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameId: number;
  user: User;

  constructor(
    private gameService: GameService, 
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
    this.createGame();
  }

  createGame(){
    return this.gameService.createGameForUser(this.user)
      .subscribe(id => {
        console.log('Received new game id: ' + id);
        this.gameId = id;
      })
  }

}
