import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class IndexDemoFormService {

  constructor(public http: HttpClient, public router:Router) { }

  submit(data:any) {

    let apiUrl = 'http://localhost:4800/workout-generator/';
    // let apiUrl = 'http://forgdapp.com/workout-generator/';

    // Removes the re-direct URL from the object
    const sendData = {
      _id: data._id,
      user: data.user
    }
// , {observe: 'response'}

    return this.http.post(apiUrl, sendData)
      .subscribe(res => {
          this.router.navigate([data.redirectUrl]);
        }
      );

  }

}
