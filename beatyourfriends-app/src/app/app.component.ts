import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from './newsletter.service';
import { BrowserStorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/** Class representing a AppComponent. */
export class AppComponent {

  title = 'Beat your Friends';
  readonly VAPID_PUBLIC_KEY = "BOi-rCsuWNJxPFhErbLo3QbzmGgHofXivHZxbbA0t02tde2Qa_s3VnofKmoOT6g0HGxwXZT9pcywv3MZBnihtBM";

  /**
    * Create a AppComponent.
    * @param {SwPush} swPush - The injected service worker
    * @param {newsletterService} NewsletterService - The injected newsletter service
    * @param {storargeService} storageService - The injected storage service
    * @author Michael Gundacker
  */
  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private storageService: BrowserStorageService) {
  }

  /**
    * Called on init of main application component
    * @author Michael Gundacker
  */
  ngOnInit(){
    //NewsletterService is currently not activated.
    //this.subscribeToNotifications();
  }

  /**
    * Subscribe to Push notifications (not activated)
    * @author Michael Gundacker
  */
  subscribeToNotifications() {
    console.log('subscribeNotifications()')
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    .then(sub => this.storageService.set('subscription', JSON.stringify(sub)))
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
