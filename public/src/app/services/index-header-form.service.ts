import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IndexHeaderFormService {

  private apiUrl = 'http://localhost:4800/api/add-user';
  // private apiUrl = 'http://forgdapp.com/api/add-user';

  constructor(private http: Http) {}

  submit(data:any) {
    console.log('data: ', data);
    return this.http.post(this.apiUrl, data)
      .map(data => data.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}


// @Injectable()
// export class CategoryService {
//   private urlcategory = "http://localhost:8080/create-category";
        
//   constructor(private http: Http){
//     senddata(data : any) 
//       var body = JSON.stringify(data);
//       var headers = new Headers();
//       headers.append('Content-Type', 'application/json');
//       return this.http.post(this.urlcategory, body, { headers: headers }).map((data: Response) => data.json()).catch(this.handleError);
//   }
// }