import { Component, OnInit } from '@angular/core';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators }        from '@angular/forms';
import { AuthService }       from '../../services/auth/auth.service';
import { FooterFormService } from '../../services/footer-form/footer-form.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public form: FormGroup;
  public validEmail: boolean = true;
  public formSubmitted: boolean = false;
  public formSubmitMessage: string;
  public formSubmitSuccess: boolean;
  public showMessage: boolean;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public footerFormService: FooterFormService,
    public router: Router) {
    this.form = fb.group({
      email: [null, Validators.compose([
        Validators.required,
        this.validateEmail
      ])]
    })
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  submit() {
    this.validEmail = this.form.controls.email.valid;
    this.formSubmitted = true;

    if (this.form.valid) {
      this.footerFormService.submit(this.form.value)
        .subscribe(data => {
          this.formSubmitMessage = data.message;
          this.formSubmitSuccess = data.success;
        });
    }
    else {
      this.formSubmitMessage = 'Error submitting email.'
    }
  }

}
