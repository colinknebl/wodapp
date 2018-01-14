import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-messages',
  templateUrl: './flash-messages.component.html',
  styleUrls: ['./flash-messages.component.scss']
})
export class FlashMessagesComponent implements OnInit {

  public message: string = 'this is my temporary message.';

  constructor() { }

  ngOnInit() {
  }

}
