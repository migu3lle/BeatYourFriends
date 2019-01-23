import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from './storage.service';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http: HttpClient,
    private storageService: BrowserStorageService) { }

  getPoints(email: string) {
   return this.http.get('http://localhost:3000/api/stat/' + email);
  }

    //increment points in db to player1points
    storePoint1(index) {
      let gameid = this.storageService.get('gameId');
      console.log('You got 1 point!');
      console.log("points update id: " + gameid);
      return this.http.get('http://localhost:3000/api/point/' + gameid);
    }
  
    //increment points in db to player2points
    storePoint2(index) {      
      let gameid = this.storageService.get('gameId');
      console.log('You got 1 point!');
      return this.http.get('http://localhost:3000/api/points/' + gameid);
    }

    getGames(){
      let token = this.storageService.get('token');
      let email = JSON.parse(token).email
      console.log(email)
      return this.http.get<Game[]>('http://localhost:3000/api/games/' + email);
    }

    getId(){
      let token = this.storageService.get('token');
      let email = JSON.parse(token).email;
      return this.http.get<number>('http://localhost:3000/api/userid/' +email);

    }
}
