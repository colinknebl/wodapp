import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    public LoginUser: LoginService,
    public fb: FormBuilder) {
    this.loginForm = fb.group({
      userName    : null,
      password    : null
    });
  }

  ngOnInit() {
  }

  submit() {
    let form = this.loginForm.value;

    console.log(form);
  }
}
