import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactFormService } from '../../services/contact-form/contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public contactForm: FormGroup;

  constructor(
    private ContactForm: ContactFormService,
    public fb: FormBuilder) {
    this.contactForm = fb.group({
      firstName   : [null],
      lastName    : [null],
      email       : [null],
      requestType : [null],
      message     : [null]
    });
  }

  ngOnInit() {
  }

  submit() {
    let form = this.contactForm.value;

    this.ContactForm.submit(form)
      .subscribe();
  }

}
