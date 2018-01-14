import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  private authToken;
  private options;
  private user;

  private loginUrl = 'http://localhost:4800/api/auth/login/v1';
  // private loginUrl = 'http://forgdapp.com/api/auth/login/v1';

  private getAccountInfoUrl = 'http://localhost:4800/api/auth/get-account-info/v1/';
  // private getAccountInfoUrl = 'http://forgdapp.com/api/auth/get-account-info/v1/';

  constructor(private http: Http) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type'  : 'application/json',
        'authorization' : this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  getAccountInfo() {

    this.createAuthenticationHeaders();
    return this.http.get(this.getAccountInfoUrl, this.options)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  login(formData) {

    return this.http.post(this.loginUrl, formData)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Checks to see if there is a valid token; if user is logged in and the token is valid, it will return true. If the user token is not valid, it will return false.
  tokenCheck() {
    return tokenNotExpired();
  }


}
