import { Component, OnInit }  from '@angular/core';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators }         from '@angular/forms';
import { ContactFormService } from '../../services/contact-form/contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public form: FormGroup;
  public message: string;

  constructor(
    public contactFormService: ContactFormService,
    public fb: FormBuilder) {
    this.form = fb.group({
      firstName   : [null, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      lastName    : [null, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      email       : [null, Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      requestType : [null, Validators.required],
      message     : [null, Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])]
    });
  }

  ngOnInit() {
  }

  validate() {
    console.log('test');
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
    let form = this.form.value;

    this.contactFormService.submit(form)
      .subscribe(data => {
        this.message = data.message;
      });
  }

}
