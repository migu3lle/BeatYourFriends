import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  message: string = '';
 
  add(newMessage: string) {
    this.message = newMessage;
    console.log('message: ' + this.message)
  }
 
  clear() {
    this.message = '';
  }
}
