import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserListService {

  constructor(private http: Http) { }

  getUsers(){
      return this.http.get('/api/userList').map(res=>res.json());
  }
  
  giveTokens(data:Object) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/giveTokens', JSON.stringify(data),{headers:headers})
      .map(res => res.json());
  }

  takeTokens(data:Object) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/takeTokens', JSON.stringify(data),{headers:headers})
      .map(res => res.json());
  }

  banUser(data: Object){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/banUser', JSON.stringify(data),{headers:headers})
      .map(res => res.json());
  }
}