import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserListService {

  constructor(private http: Http) { }

  getUsers(): any{
      return this.http.get('/api/userList').toPromise()  }
  
  giveTokens(data:Object): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/giveTokens', JSON.stringify(data),{headers:headers})
      .toPromise();
  }

  takeTokens(data:Object): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/takeTokens', JSON.stringify(data),{headers:headers})
      .toPromise();
  }

  banUser(data: Object): any{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/banUser', JSON.stringify(data),{headers:headers})
      .toPromise();
  }
}