import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FlashMessagesService {

  public subject = new Subject<any>();

  constructor() { }

  sendMessage(flashMessage: any) {
    this.subject.next({
      message: flashMessage.message,
      messageClass: flashMessage.messageClass,
      showMessageBool: flashMessage.showMessageBool,
      messageDuration: flashMessage.messageDuration
    });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
