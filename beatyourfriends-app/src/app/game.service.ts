import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl = 'http://localhost:3000/game/';

  constructor(private http: HttpClient) { }

  createGameForUser(token: String, id:String): Observable<number> {
    //Generate random game ID and send to server to be stored in database
    let gameId = Math.floor(Math.random() * (999999 - 9999) + 9999);
    let obj = {gametoken: token, player2: id};
    console.log(id);
    return this.http.put<number>(this.gameUrl + gameId, obj);
  }
}
