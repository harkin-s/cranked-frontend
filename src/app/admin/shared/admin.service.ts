import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AdminService {

  constructor(private http: Http) { }

  getTickets() {
    return this.http.get('/api/allTickets').map((res) => res.json());
  }

  sendReply(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put('/api/staffTicketReply', JSON.stringify(data), { headers: headers })
    .map(res => res.json());
  }

  closeTicket(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put('/api/closeTicket', JSON.stringify(id), { headers: headers })
    .map(res => res.json());
  }
  uploadFile(file, id, messNum) {
    const headers = new Headers();
    headers.delete('Content-Type');
    const params = new URLSearchParams();
    params.set('issueId', id );
    params.set('messageNum', messNum);

    return this.http
    .post('/api/uploadFile', file, { headers: headers, params: params })
    .map(res => res.json());
  }

  getTicketImage(ticketNum, messageNum, imageName) {
    const headers = new Headers();
    const params = new URLSearchParams();
    params.set('ticketNum', ticketNum);
    params.set('messageNum', messageNum);
    params.set('imageName', imageName);
    const options = new RequestOptions({
      headers: headers,
      params: params
    });
    options.responseType = ResponseContentType.Blob;
    return this.http.get('/api/ticketImage', options).map(res => res.blob() );
  }

  getAdmListings() {
    return this.http.get('/api/admListings').map(res => res.json())
  }

  cancelListing(listing) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/cancelListing', JSON.stringify(listing), {headers: headers});
  }

  modifyListing(listing) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/modifyListing', JSON.stringify(listing), { headers: headers});
  }

  removeFromAdm(listing) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/removeFromAdm', JSON.stringify(listing), { headers: headers});
  }
}
