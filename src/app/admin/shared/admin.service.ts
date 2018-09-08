import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';

@Injectable()
export class AdminService {

  constructor(private http: Http) { }

  getTickets(): any {
    return this.http.get('${environment.apiUrl}/allTickets').toPromise()
  }

  sendReply(data): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put('${environment.apiUrl}/staffTicketReply', JSON.stringify(data), { headers: headers })
    .toPromise();
  }

  closeTicket(id): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put('${environment.apiUrl}/closeTicket', JSON.stringify(id), { headers: headers })
    .toPromise();
  }
  uploadFile(file, id, messNum): any {
    const headers = new Headers();
    headers.delete('Content-Type');
    const params = new URLSearchParams();
    params.set('issueId', id );
    params.set('messageNum', messNum);

    return this.http
    .post('${environment.apiUrl}/uploadFile', file, { headers: headers, params: params })
    .toPromise();
  }

  getTicketImage(ticketNum, messageNum, imageName): any {
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
    return this.http.get('${environment.apiUrl}/ticketImage', options).toPromise();
  }

  getAdmListings(): any {
    return this.http.get('${environment.apiUrl}/admListings').toPromise()  
  }

  cancelListing(listing): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('${environment.apiUrl}/cancelListing', JSON.stringify(listing), {headers: headers}).toPromise();
  }

  modifyListing(listing): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('${environment.apiUrl}/modifyListing', JSON.stringify(listing), { headers: headers});
  }

  removeFromAdm(listing): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('${environment.apiUrl}/removeFromAdm', JSON.stringify(listing), { headers: headers});
  }
}
