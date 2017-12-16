import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetWodService {

  constructor(public http:Http) { }
// https://jsonplaceholder.typicode.com/posts
// 'http://localhost:4800/api/get-wod/' + _id
// 'http://localhost:5200/api/get-wod'
  getWod(_id) {
    return this.http.get('http://localhost:4800/api/get-wod/' + _id)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
