import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class IndexDemoFormService {

  constructor(private http: HttpClient, private router:Router) { }

  submit(object:any) {

    // let apiUrl = 'http://localhost:4800/workout-generator/';
    let apiUrl = 'http://forgdapp.com/workout-generator/';

    return this.http.post(apiUrl, object.data, {observe: 'response'})
      .subscribe(res => {
          this.router.navigate([object.redirectUrl]);
        }
      );

  }

}
