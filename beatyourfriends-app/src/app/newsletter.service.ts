import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) {
  }

  addPushSubscriber(sub:any) {
      console.log('Subscription: ' + JSON.stringify(sub));
      return this.http.post('/api/notifications', sub);
  }

  send() {
      return this.http.post('/api/newsletter', null);
  }
}
