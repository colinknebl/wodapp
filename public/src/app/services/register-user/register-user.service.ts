import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterUserService {

  public apiUrl = 'http://localhost:4800/api/register-user/v3';
  // public apiUrl = 'http://forgdapp.com/api/register-user/v3';

  public checkUsernameUrl = 'http://localhost:4800/api/check-username/v1/';
  // public checkUsernameUrl = 'http://forgdapp.com/api/check-username/v1/';

  public checkEmailUrl = 'http://localhost:4800/api/check-email/v1/';
  // public checkEmailUrl = 'http://forgdapp.com/api/check-email/v1/';

  constructor(
    public http:Http
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
