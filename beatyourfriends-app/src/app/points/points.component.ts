import { Component, OnInit } from '@angular/core';
import { PointsService } from '../points.service';
import { BrowserStorageService } from '../storage.service';

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

  constructor(private pointsService: PointsService,
    private storageService: BrowserStorageService) { }

  ngOnInit() {
    let email = this.storageService.get('email');
    this.pointsService.getPoints(email)
    .subscribe(result => {
      this.points.won = result[0].won;
      this.points.equal = result[0].equal;
      this.points.loose = result[0].loose;
    });
  }

}

interface Points {
  won: string,
  equal: string,
  loose: string
}
