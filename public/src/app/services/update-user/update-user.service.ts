import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UpdateUserService {

  private updateUrl = 'http://localhost:4800/api/update-user/v1';
  // private updateUrl = 'http://forgdapp.com/api/update-user/v1';

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  updateUser(userData: any) {

    const headers = this.authService.getAuthenticationHeaders();

    return this.http.post(this.updateUrl, userData, headers)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || `Internal Server error: ${error.message}`));
  }

}
