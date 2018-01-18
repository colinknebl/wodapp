import { Component, OnInit }      from '@angular/core';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators }             from '@angular/forms';
import { IndexHeaderFormService } from '../../services/index-header-form/index-header-form.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public form: FormGroup;
  public message: string;

  constructor(
    public indexForm: IndexHeaderFormService,
    public fb: FormBuilder) {
    this.form = fb.group({
      firstName : [null, Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20)
        ])],

      lastName  : [null, Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20)
        ])],

      email     : [null, Validators.compose([
          Validators.required,
          this.validateEmail
        ])]
    });

  }

  ngOnInit() {
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (regExp.test(controls.value)) {
      return null;
    }
    else {
      return { 'validateEmail' : true};
    }
  }

  submit() {
    this.indexForm.submit(this.form.value)
      .subscribe(data => {
        if (data.success) {
          this.message = data.message;
        }
      });
  }
}
