import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl = 'http://localhost:3000/api/play/';

  constructor(private http: HttpClient, private storageService: BrowserStorageService) { }

    //create new game
  createGameForUser(token: String, id:String): Observable<number> {

    //Generate random game ID and send to server to be stored in database
    let gameId = Math.floor(Math.random() * (999999 - 9999) + 9999);
    this.storageService.set('gameId', gameId.toString());
    let obj = {gametoken: token, player2: id};
    console.log(gameId);
    return this.http.put<number>(this.gameUrl + gameId, obj);
  }

  //check if game exists
  getGame(token: string, user1: string) {
    let obj = {gametoken: token, user1: user1};
    return this.http.post<number>(this.gameUrl, obj);
  }

  //fetch question from api
  getQuestion(counter, gameid) {
    return this.http.post('http://localhost:3000/api/question/' + counter, gameid);
  }

  //fetch right answer index from db
  getAnswer(token: string) {
    return this.http.get('http://localhost:3000/api/answer/' + token);
  }

  //get player 2s game status from api
  getPlayStat1() {
    let gameid = this.storageService.get('gameId');
    return this.http.get('http://localhost:3000/api/player/'+gameid);
  }

  //get player 2s game status from api
  getPlayStat2() {
  let gameid = this.storageService.get('gameId');
  return this.http.get('http://localhost:3000/api/players/'+gameid);
  }

  //set my game status to 0 and player2s to 1
  updatePlayStat(player2id) {
    let gameid = this.storageService.get('gameId');
    return this.http.put('http://localhost:3000/api/player/'+gameid, {player2id: player2id, gameid: gameid});
  }

  //check who has won
  getWinner() {
    let gameid = this.storageService.get('gameId');
    return this.http.post('http://localhost:3000/api/winner', gameid);
  }

  //store that player1 has won
  storeWon(email1: string, email2: string) {
  let body = {email1: email1, email2: email2};
  return this.http.put('http://localhost:3000/api/won', body);

  }

  //store equal points
  storeEqual(email1: string, email2: string) {
    let body = {email1: email1, email2: email2};
    return this.http.put('http://localhost:3000/api/equal', body);

  }

  //store that player2 has won
  storeLooser(email1: string, email2: string) {
    let body = {email1: email1, email2: email2};
    return this.http.put('http://localhost:3000/api/loose', body);

  }
}

