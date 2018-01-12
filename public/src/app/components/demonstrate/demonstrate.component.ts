import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexDemoFormService } from '../../services/index-demo-form/index-demo-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demonstrate',
  templateUrl: './demonstrate.component.html',
  styleUrls: ['./demonstrate.component.scss']
})
export class DemonstrateComponent implements OnInit {
  @ViewChild("_id", {read: ElementRef}) tref: ElementRef;

  public demoForm: FormGroup;

  constructor(
    public router:Router,
    public indexDemoForm: IndexDemoFormService,
    public fb: FormBuilder) {
    this.demoForm = fb.group({
      firstName : ['Colin', Validators.required],
      lastName  : ['Knebl', Validators.required],
      email     : ['colin.knebl@outlook.com', Validators.required],
      tel       : [null],
      skillLvl  : ['intermediate'],
      gender    : ['male'],
      wodType   : ['amrap'],
      muscleGrp : ['legs'],
      repScheme : ['any'],
      wodTimer  : ['any'],
      maxBench  : [250],
      maxSquat  : [280],
      maxSnatch : [135],
      maxDead   : [315],
      equipment : [['bench', 'barbell', 'plates', 'rack', 'dumbbells'], Validators.required],
      _id       : [Date.now(), Validators.required]
    });
  }

  ngOnInit() {
  }

  assignId() {
    let time = new Date().getTime();
    this.tref.nativeElement.value = time;
  }

  submit() {

    let form = this.demoForm.value;
    let redirectUrl = '/workout-generator/' + form._id + form.firstName[0] + form.lastName[0];

    this.indexDemoForm.submit({
      data: this.demoForm.value,
      redirectUrl: redirectUrl
    });
  }

}
