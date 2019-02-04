import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

/** Class representing a MessageComponent. Displays the current messages of Points Component */
export class MessagesComponent implements OnInit {
  /**
    * Create a MessageComponent.
    * @param {MessageService} messageService - The injected messageService object.
    * @author Michael Gundacker
  */
  constructor(
    public messageService: MessageService,
    ) { }

  /**
    * Called on init of message component
    * @author Michael Gundacker
  */
  ngOnInit() {
    this.messageService.clear();
  }

}
