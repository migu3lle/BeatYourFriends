import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

/** Class representing the newsletter services */
export class NewsletterService {
  /**
    * Create a NewsletterService.
    * @param {http} HttpClient - The injected HttpClient object.
    * @author Michael Gundacker
  */
  constructor(private http: HttpClient) {
  }

  /**
      * Adds a new push subscriber on server database
      * @param {sub} any - A push subscription object
      * @author Michael Gundacker
  */
  addPushSubscriber(sub:any) {
      console.log('Subscription: ' + JSON.stringify(sub));
      return this.http.post('/api/notifications', sub);
  }

  /**
      * Triggers a new push notification on the server to the respective subscription
      * @param {id} number - The user id which should receive an notification
      * @author Michael Gundacker
  */
  send(id: number) {
      return this.http.post('/api/newsletter', {userid: id});
  }
}
