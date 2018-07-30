import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class UserService {
  private user = new BehaviorSubject<any>({});
  currentUser = this.user.asObservable();
  public socket;

  constructor(private http: HttpClient, private router: Router) {
    this.socket = io();
  }
  //Get user details
  getUser(): any {
    return this.http.get('/api/getUser');
  }

  updateUser(userData: any): any {
    this.user.next(userData);
  }

  checkAccess(): any {
    return this.http.get('/api/hasAccess');
  }
  updateTradeUrl(tradeUrl: String): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data = {
      tradeUrl: tradeUrl
    };
    return this.http.post('/api/updateTradeUrl', JSON.stringify(data), { headers });
  }

  keepSkin(auctionId: string): any {
    const body = {
     auctionId
    };
    return this.http.post('/api/keepSkin', body);
  }

  convertSkin(auctionId: string, marketName: string): any {
    const body = {
      auctionId,
      marketName
    };
    return this.http.post('/api/convertSkin', body);
  }

  getSkinValue(skinName: string): any {
    const options = {
      params: new HttpParams()
        .set('skinName', skinName)
    };
    return this.http.get('/api/getSkinTokenValue', options);
  }

  hideCookiePolicy(): any {
    return this.http.get('/api/hideCookiePolicy');
  }

  getUserInfo(): any {
    return this.http.get('/api/getUserInfo');
  }

  getUserWins(): any {
    return this.http.get('/api/getUserWins');
  }

  getLeaderboard(): any {
    return this.http.get('/api/leaderboard');
  }

  transferTokens(receiver) : any{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/transferTokens', JSON.stringify(receiver), { headers });
  }

  removeListing(listing): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/userUnlist', JSON.stringify(listing), { headers });
  }

  listAuction(listingId): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/userList', {listingId}, { headers });
  }

  createTicket(ticket, images): any {
    const options = {
      headers: new HttpHeaders().delete('Content-Type'),
      params: new HttpParams().set('ticket', JSON.stringify(ticket))
    };
    const formData: FormData = new FormData();
    formData.append('images', images);
    console.log(images);
    return this.http.post('api/userCreateTicket', formData ,  options);
  }

  async getTicketImage(ticketNum, messageNum, imageName): Promise<Blob> {
  const options = {
    headers: new HttpHeaders(),
    params: new HttpParams()
      .set('ticketNum', ticketNum)
      .set('messageNum', messageNum)
      .set('imageName', imageName),
    responseType: 'blob' as 'json'
    };
    //May need to add blob
    return this.http.get<Blob>('/api/ticketImage', options).toPromise();
  }

  ticketUpdate(ticketRes, images): any {
    const options = {
      headers: new HttpHeaders().delete('Content-Type'),
      params: new HttpParams().set('ticket', JSON.stringify(ticketRes))
    };

    return this.http.post('api/userTicketReply', images, options);
  }

   createAffiliateCode(code): any{
    const options = { params: new HttpParams().set('code', code)};
    return this.http.get("api/createCode", options);
   }

   useAffiliateCode(code): any{
    const options = { params: new HttpParams().set('code', code)};
    return this.http.get("api/useCode", options);
   }
}
