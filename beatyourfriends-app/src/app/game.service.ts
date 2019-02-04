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

  /**
    * Create a new game with random gameID
    * @param {token} String - Token of currently logged in user - identifies player 1
    * @param {id} String - ID of player 2 chosen from friends list
    * @returns {Observable<number>} - The game id
    * @author Michael Gundacker, Christina Senger
  */
  createGameForUser(token: String, id:String): Observable<number> {
    //Generate random game ID and send to server to be stored in database
    let gameId = Math.floor(Math.random() * (999999 - 9999) + 9999);
    this.storageService.set('gameId', gameId.toString());
    let obj = {gametoken: token, player2: id};
    console.log(gameId);
    return this.http.put<number>(this.gameUrl + gameId, obj);
  }

    /**
    * check if the game already exists
    * @param {string} token - token of game
    * @param {string} user1 - id user1
    * @author Christina Senger, Felix Gaggl
  */
  getGame(token: string, user1: string) {
    let obj = {gametoken: token, user1: user1};
    return this.http.post<number>(this.gameUrl, obj);
  }

   /**
    * Get new question for the game
    * @param {any} counter - number of question
    * @param {any} gameid - id of the game
    * @author Christina Senger
  */
  getQuestion(counter, gameid) {
    console.log("get question from game " + gameid);
    let obj = {game: gameid };
    return this.http.post('http://localhost:3000/api/question/' + counter, obj);
  }

   /**
    * Get the answer of the question with the token
    * @param {string} token - token of question
    * @author Christina Senger
  */
  getAnswer(token: string) {
    return this.http.get('http://localhost:3000/api/answer/' + token);
  }

   /**
    * Get the status of the player1
    * @param {any} player1id - Id of player1
    * @author Felix Gaggl
  */
  getPlayStat1() {
    let gameid = this.storageService.get('gameId');
    return this.http.get('http://localhost:3000/api/player/'+gameid);
  }

   /**
    * Get the status of the player2
    * @param {any} player2id - Id of player2
    * @author Felix Gaggl
  */
  getPlayStat2() {
  let gameid = this.storageService.get('gameId');
  return this.http.get('http://localhost:3000/api/players/'+gameid);
  }

  /**
    * Updates the status of the player2
    * @param {any} player2id - Id of player2
    * @author Felix Gaggl
  */
  updatePlayStat(player2id) {
    let gameid = this.storageService.get('gameId');
    return this.http.put('http://localhost:3000/api/player/'+gameid, {player2id: player2id, gameid: gameid});
  }

    /**
    * Get the winner of the game
    * @author Christina Senger
  */
  getWinner() {
    let gameid = this.storageService.get('gameId');
    return this.http.post('http://localhost:3000/api/winner', gameid);
  }

    /**
    * Store the player who won
    * @param {string} email1 - email of player1
    * @param {string} email2 - email of player2
    * @author Christina Senger
  */
  storeWon(email1: string, email2: string) {
  let body = {email1: email1, email2: email2};
  return this.http.put('http://localhost:3000/api/won', body);

  }

  /**
    * store that equal
    * @param {string} email1 - email of player1
    * @param {string} email2 - email of player2
    * @author Christina Senger
  */
  storeEqual(email1: string, email2: string) {
    let body = {email1: email1, email2: email2};
    return this.http.put('http://localhost:3000/api/equal', body);

  }

  /**
    * store the looser
    * @param {string} email1 - email of player1
    * @param {string} email2 - email of player2
    * @author Christina Senger
  */
  storeLooser(email1: string, email2: string) {
    let body = {email1: email1, email2: email2};
    return this.http.put('http://localhost:3000/api/loose', body);

  }

  /**
    * Updates/increments the round of the game with the gameId
    * @param {any} gameId - Id of the current game
    * @author Felix Gaggl
  */
  updateRound(gameId){
    console.log("requesting a round change, client side");
    return this.http.put('http://localhost:3000/api/updateRound/' +gameId, {gameid: gameId});
  }
}

