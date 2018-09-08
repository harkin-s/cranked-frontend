import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private user = new BehaviorSubject<any>({});
  currentUser = this.user.asObservable();
  public socket;

  constructor(private http: HttpClient, private router: Router) {
    this.socket = io(environment.apiUrl);
  }
  //Get user details
  getUser(): any {
    console.log(environment)
    return this.http.get(`${environment.apiUrl}/getUser`).toPromise();
  }

  updateUser(userData: any): any {
    this.user.next(userData);
  }

  checkAccess(): any {
    return this.http.get(`${environment.apiUrl}/hasAccess`);
  }
  updateTradeUrl(tradeUrl: String): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data = {
      tradeUrl: tradeUrl
    };
    return this.http.post(`${environment.apiUrl}/updateTradeUrl`, JSON.stringify(data), { headers });
  }

  keepSkin(auctionId: string): any {
    const body = {
     auctionId
    };
    return this.http.post(`${environment.apiUrl}/keepSkin`, body);
  }

  convertSkin(auctionId: string, marketName: string): any {
    const body = {
      auctionId,
      marketName
    };
    return this.http.post(`${environment.apiUrl}/convertSkin`, body);
  }

  getSkinValue(skinName: string): any {
    const options = {
      params: new HttpParams()
        .set('skinName', skinName)
    };
    return this.http.get(`${environment.apiUrl}/getSkinTokenValue`, options);
  }

  hideCookiePolicy(): any {
    return this.http.get(`${environment.apiUrl}/hideCookiePolicy`);
  }

  getUserInfo(): any {
    return this.http.get(`${environment.apiUrl}/getUserInfo`);
  }

  getUserWins(): any {
    return this.http.get(`${environment.apiUrl}/getUserWins`);
  }

  getLeaderboard(): any {
    return this.http.get(`${environment.apiUrl}/leaderboard`);
  }

  transferTokens(receiver) : any{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.apiUrl}/transferTokens`, JSON.stringify(receiver), { headers });
  }

  removeListing(listing): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.apiUrl}/userUnlist`, JSON.stringify(listing), { headers });
  }

  listAuction(listingId): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.apiUrl}/userList`, {listingId}, { headers });
  }

  createTicket(ticket, images): any {
    const options = {
      headers: new HttpHeaders().delete('Content-Type'),
      params: new HttpParams().set('ticket', JSON.stringify(ticket))
    };
    const formData: FormData = new FormData();
    formData.append('images', images);
    console.log(images);
    return this.http.post(`${environment.apiUrl}/userCreateTicket`, formData ,  options);
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
    return this.http.get<Blob>(`${environment.apiUrl}/ticketImage`, options).toPromise();
  }

  ticketUpdate(ticketRes, images): any {
    const options = {
      headers: new HttpHeaders().delete('Content-Type'),
      params: new HttpParams().set('ticket', JSON.stringify(ticketRes))
    };

    return this.http.post(`${environment.apiUrl}/userTicketReply`, images, options);
  }

   createAffiliateCode(code): any{
    const options = { params: new HttpParams().set('code', code)};
    return this.http.get(`${environment.apiUrl}/createCode`, options);
   }

   useAffiliateCode(code): any{
    const options = { params: new HttpParams().set('code', code)};
    return this.http.get(`${environment.apiUrl}/useCode`, options);
   }
}
