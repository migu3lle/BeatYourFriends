import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from './newsletter.service';
import { BrowserStorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Beat your Friends';
  readonly VAPID_PUBLIC_KEY = "BOi-rCsuWNJxPFhErbLo3QbzmGgHofXivHZxbbA0t02tde2Qa_s3VnofKmoOT6g0HGxwXZT9pcywv3MZBnihtBM";

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private storageService: BrowserStorageService) {
  }

  ngOnInit(){
    //Push notification was not implemented yet
    //this.subscribeToNotifications();
  }

  //Subscribe to Push notifications
  subscribeToNotifications() {
    console.log('subscribeNotifications()')
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    //.then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    .then(sub => this.storageService.set('subscription', JSON.stringify(sub)))
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
