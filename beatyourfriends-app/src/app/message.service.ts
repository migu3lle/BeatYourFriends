import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/** Class representing the message services */
export class MessageService {

  constructor() { }

  message: string = '';

  /**
      * Displays the current messages of Points Component
      * @param {newMessage} str - A new message string to be displayed
      * @author Michael Gundacker
  */
  add(newMessage: string) {
    this.message = newMessage;
    console.log('message: ' + this.message)
  }
  /**
      * Clears the current message
      * @author Michael Gundacker
  */
  clear() {
    this.message = '';
  }
}
