import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { auction } from '../admin/auction';
import { environment } from '../../environments/environment';
@Injectable()
export class AuctionServices {

  constructor(private http: Http) {
  }

  // Get all posts from the API
  getAllAuctions() : any{
    return this.http.get(`${environment.apiUrl}/auctions`)
      .toPromise();
  }

  addAuction(auction: auction): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(`${environment.apiUrl}/addAuction`, JSON.stringify(auction), { headers: headers })
      .toPromise();
  }

  getPrice(weaponName: string): any {
    let params: URLSearchParams = new URLSearchParams();
    params.set("name", weaponName);
    return this.http.get(`${environment.apiUrl}/getPrice`, { search: params })
      .toPromise();
  }

  getImage(skinName: string): any{
    let params: URLSearchParams = new URLSearchParams();
    skinName = skinName.replace(/\s/g,'');
    console.log(skinName);
    params.set("name", skinName);
    return this.http.get(`${environment.apiUrl}/skinImage`, { search: params })
      .toPromise();
  }

  getInventory(): any {
    return this.http.get(`${environment.apiUrl}/getInventory`)
      .toPromise();
  }

  getOpskinsInventory(): any {
    return this.http.get(`${environment.apiUrl}/getOpskinsInventory`)
      .toPromise();
  }

  getUserInventory(): any {
    return this.http.get(`${environment.apiUrl}/getUserInventory`)
      .toPromise();
  }

  removeAuction(id): any {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    return this.http.delete(`${environment.apiUrl}/removeAuction`, { search: params}).toPromise();
  }
  getWear(link: string): any {
    let params = new URLSearchParams();
    params.set('link', link);
    return this.http.get(`${environment.apiUrl}/wear`, { search: params })
      .toPromise();
  }
}
