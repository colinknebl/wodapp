import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cta-bar',
  templateUrl: './cta-bar.component.html',
  styleUrls: ['./cta-bar.component.scss']
})
export class CtaBarComponent implements OnInit {

  ctaText = "Where will your fitness take you?";

  constructor() { }

  ngOnInit() {
  }

}
