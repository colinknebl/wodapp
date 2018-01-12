import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserService } from '../../services/register-user/register-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor
    (
      private RegisterUser: RegisterUserService,
      private fb: FormBuilder
    ) 
    {
      this.form = fb.group({
        firstName   : [null, Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
          ])],

        lastName    : [null, Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
          ])],

        email       : [null, Validators.compose([
            Validators.required,
            this.validateEmail
          ])],

        username    : [null, Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
            this.validateUsername
          ])],

        password    : [null, Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(35),
            // this.validatePassword
          ])],

        confirm     : [null, Validators.compose([
            Validators.required
          ])]
    }, { 
      validator: this.matchingPasswords('password', 'confirm') 
    });
  }

  ngOnInit() {}

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (regExp.test(controls.value)) {
      return null;
    }
    else {
      return { 'validateEmail' : true};
    }
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

    if (regExp.test(controls.value)) {
      return null;
    }
    else {
      return { 'validateUsername' : true };
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);

    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validatePassword': true };
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      }
      else {
        return { 'matchingPasswords' : true};
      }
    }
  }


  submit() {
    let form = this.form.value;

    this.RegisterUser.submit(form)
      .subscribe();
  }

}
