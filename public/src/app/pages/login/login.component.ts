import { Component,
         OnInit,
         ViewChild,
         ElementRef }           from '@angular/core';
import { FormControl, 
         FormGroup, 
         FormBuilder, 
         Validators }           from '@angular/forms';
import { AuthService }          from '../../services/auth/auth.service';
import { Router }               from '@angular/router';
import { AuthGuard }            from '../../guards/auth.guard';
import { FlashMessagesService } from '../../services/flash-messages/flash-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public usernameErrorMessage: string;
  public passwordErrorMessage: string;
  public processing: boolean = false;
  public message: string;
  public previousUrl: string;
  public mobileMessage: string;
  public loginSuccess: boolean;

  constructor(
    public router: Router,
    public authService: AuthService,
    public fb: FormBuilder,
    public authGuard: AuthGuard,
    public flashMessagesService: FlashMessagesService
  ) {
    this.form = fb.group({
      username : [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])],
      password : [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ])]
    });
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = null;
    }
  }

  disableForm() {
    this.form.disable();
  }

  enableForm() {
    this.form.enable();
  }

  usernameValidator() {

    if (this.form.controls.username.dirty) {
      let username = this.form.controls.username.value;
     
      if (username && (username.length < 5 || username.length > 20)) {
        this.usernameErrorMessage = 'Username must be 5-20 characters.';
      }
      else {
        this.usernameErrorMessage = null; 
      }
    }
  }

  passwordValidator() {

    if (this.form.controls.password.dirty) {
      let password = this.form.controls.password.value;
     
      if (password && (password.length < 8 || password.length > 35)) {
        this.passwordErrorMessage = 'Password must be 8-35 characters.';
      }
      else {
        this.passwordErrorMessage = null; 
      }
    }
  }

  submit() {
    
    this.processing = true;
    this.disableForm();
    let form = this.form.value;

    this.authService.login(form)
      .subscribe(data => {
        this.enableForm();
        this.processing = false;

        this.mobileMessage = data.message;

        if (data.success) {
          this.loginSuccess = true;
          this.flashMessagesService.sendMessage({
            message: 'Login successful!',
            messageClass: 'success',
            showMessageBool: true,
            messageDuration: 4000
          });

          this.authService.storeUserData(data.token, data.user);
          setTimeout(() => {
            /*
              If the user was not logged in and tried to access a page that was restricted, they will be redirected to the page they tried to access after they log in.
              NOTE: See this.ngOnInit for more
            */
            if (this.previousUrl) {
              this.router.navigate([this.previousUrl]);
            }
            else {
              this.router.navigate(['/account']);
            }
          }, 2000)
        }
        else {
          this.loginSuccess = false;
          this.loginSuccess = true;
          this.flashMessagesService.sendMessage({
            message: 'Login failed!',
            messageClass: 'alert',
            showMessageBool: true,
            messageDuration: 4000
          });
        }
      });
  }
}










