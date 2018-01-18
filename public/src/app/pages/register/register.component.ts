import { Component, OnInit }    from '@angular/core';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators }           from '@angular/forms';
import { RegisterUserService }  from '../../services/register-user/register-user.service';
import { FlashMessagesService } from '../../services/flash-messages/flash-messages.service';
import { Router }               from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  message: any[] = [];
  usernameAvailable: boolean = false;
  emailAvailable: boolean = false;

  constructor
    (
      public router:Router,
      public RegisterUser: RegisterUserService,
      public flashMessagesService: FlashMessagesService,
      public formBuilder: FormBuilder
    ) 
    {
      this.form = formBuilder.group({
        firstName   : [null, Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ])],

        lastName    : [null, Validators.compose([
            Validators.required,
            Validators.minLength(1),
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
            this.validatePassword
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

  checkUsername() {
    if (this.form.get('username').valid) {

      let username = this.form.get('username').value;
      
      this.RegisterUser.checkUsername(username)
        .subscribe(data => {
          this.usernameAvailable = data.success;
        });
    }
    else {
      console.log('username is not valid');
    }
  }

  checkEmail() {
    if (this.form.get('email').valid) {

      let email = this.form.get('email').value;
      
      this.RegisterUser.checkEmail(email)
        .subscribe(data => {
          console.log('checkEmail() subscribed data:', data);
          this.emailAvailable = data.success;
        });
    }
    else {
      console.log('email is not valid');
    }
  }


  submit() {
    let form = this.form.value;

    this.RegisterUser.submit(form)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.flashMessagesService.sendMessage({
              message: res.message,
              messageClass: 'success',
              showMessageBool: true,
              messageDuration: 4000
            });

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3500)
          }
          else {
            this.flashMessagesService.sendMessage({
              message: res.message,
              messageClass: 'alert',
              showMessageBool: true,
              messageDuration: 4000
            });
          };
        },
        err => console.log(err));
  }

}
