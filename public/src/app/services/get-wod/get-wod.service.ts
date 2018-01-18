import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetWodService {

  public apiUrl = 'http://localhost:4800/api/get-wod/';
  // public apiUrl = 'http://forgdapp.com/api/get-wod/';

  constructor(public http:Http) { }

  getWod(_id) {
    return this.http.get(this.apiUrl + _id)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
