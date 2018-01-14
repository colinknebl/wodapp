import { Component, OnInit } from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  FormBuilder, 
  Validators }               from '@angular/forms';
import { AuthService }       from '../../services/auth/auth.service';
import { Router }            from '@angular/router';
import { AuthGuard }         from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  private usernameErrorMessage: string;
  private passwordErrorMessage: string;
  private processing: boolean = false;
  public message: string;
  public previousUrl: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private authGuard: AuthGuard
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
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
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
    // console.log(this.form.value);
    this.processing = true;
    this.disableForm();
    let form = this.form.value;

    this.authService.login(form)
      .subscribe(data => {
        this.message = data.message;
        this.enableForm();
        this.processing = false;
        
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          console.log(this.previousUrl);
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
      });
  }
}










