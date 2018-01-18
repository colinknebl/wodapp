import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactFormService {

  public apiUrl = 'http://localhost:4800/api/contact-form';
  // public apiUrl = 'http://forgdapp.com/api/contact-form';

  constructor(
    public http:Http) { }

  submit(data:any) {

    return this.http.post(this.apiUrl, data)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}
