import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http: HttpClient) { }

  getPoints(email: string) {
   return this.http.get('http://localhost:3000/api/stat/' + email);
  }
}
