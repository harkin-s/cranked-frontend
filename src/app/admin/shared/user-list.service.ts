import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';

@Injectable()
export class UserListService {

  constructor(private http: Http) { }

  getUsers(): any{
      return this.http.get('${environment.apiUrl}/userList').toPromise()  }
  
  giveTokens(data:Object): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('${environment.apiUrl}/giveTokens', JSON.stringify(data),{headers:headers})
      .toPromise();
  }

  takeTokens(data:Object): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('${environment.apiUrl}/takeTokens', JSON.stringify(data),{headers:headers})
      .toPromise();
  }

  banUser(data: Object): any{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('${environment.apiUrl}/banUser', JSON.stringify(data),{headers:headers})
      .toPromise();
  }
}