import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexHeaderFormService } from '../../services/index-header-form/index-header-form.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(
    public indexForm: IndexHeaderFormService,
    public fb: FormBuilder) {
    this.signUpForm = fb.group({
      firstName : [null, Validators.required],
      lastName  : [null, Validators.required],
      email     : [null, Validators.required]
    });

  }

  ngOnInit() {
  }

  submit() {
    this.indexForm.submit(this.signUpForm.value)
      .subscribe();
  }
}
