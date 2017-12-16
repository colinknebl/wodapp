import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-demonstrate',
  templateUrl: './demonstrate.component.html',
  styleUrls: ['./demonstrate.component.scss']
})
export class DemonstrateComponent implements OnInit {
  @ViewChild("_id", {read: ElementRef}) tref: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  assignId() {
    let time = new Date().getTime();
    this.tref.nativeElement.value = time;
  }

}
