import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterUserService {

  private apiUrl = 'http://localhost:4800/api/register-user/v3';
  // private apiUrl = 'http://forgdapp.com/api/register-user/v3';

  private checkUsernameUrl = 'http://localhost:4800/api/check-username/v1/';
  // private checkUsernameUrl = 'http://forgdapp.com/api/check-username/v1/';

  private checkEmailUrl = 'http://localhost:4800/api/check-email/v1/';
  // private checkEmailUrl = 'http://forgdapp.com/api/check-email/v1/';

  constructor(
    private http:Http
  ) { }

  checkUsername(username:string) {

    return this.http.get(this.checkUsernameUrl + username)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  checkEmail(email:string) {

    return this.http.get(this.checkEmailUrl + email)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  submit(data:any) {
  
    return this.http.post(this.apiUrl, data)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}
