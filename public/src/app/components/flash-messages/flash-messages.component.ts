import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from '../../services/flash-messages/flash-messages.service';

@Component({
  selector: 'app-flash-messages',
  templateUrl: './flash-messages.component.html',
  styleUrls: ['./flash-messages.component.scss']
})
export class FlashMessagesComponent implements OnInit {
  
  public message: string;
  public messageClass: string;
  public showMessageBool: boolean = false;
  // public message: string = 'filler string';
  // public messageClass: string = 'info';
  // public showMessageBool: boolean = true;
  public subscription: Subscription;
 
    constructor(
      public flashMessageService: FlashMessagesService
    ) {
        this.subscription = this.flashMessageService.getMessage()
          .subscribe(flashMessage => {
            this.message = flashMessage.message;
            this.messageClass = flashMessage.messageClass;
            this.showMessageBool = flashMessage.showMessageBool;

            if (flashMessage.messageDuration) {
              this.autoCloseMessage(flashMessage.messageDuration);
            }
          });
    }

    ngOnInit() {}

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
    }

    clearMessageLog() {
      this.message = null;
      this.messageClass = null;
      this.showMessageBool = false;
    }
 
    closeMessage() {
      this.ngOnDestroy();
      this.clearMessageLog();
    }

    autoCloseMessage(duration) {
      setTimeout(() => {
        this.ngOnDestroy();
        this.clearMessageLog();
      }, duration);
    }



}
