import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterUserService {

  private apiUrl = 'http://localhost:4800/api/register-user';
  // private apiUrl = 'http://forgdapp.com/api/register-user';

  constructor(
    private http:Http) { }

  submit(data:any) {
  
    return this.http.post(this.apiUrl, data)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}
