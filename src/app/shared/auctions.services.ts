import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { auction } from '../admin/auction';
@Injectable()
export class AuctionServices {

  constructor(private http: Http) {
  }

  // Get all posts from the API
  getAllAuctions() : any{
    return this.http.get('/api/auctions')
      .toPromise();
  }

  addAuction(auction: auction): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put('/api/addAuction', JSON.stringify(auction), { headers: headers })
      .toPromise();
  }

  getPrice(weaponName: string): any {
    let params: URLSearchParams = new URLSearchParams();
    params.set("name", weaponName);
    return this.http.get('/api/getPrice', { search: params })
      .toPromise();
  }

  getImage(skinName: string): any{
    let params: URLSearchParams = new URLSearchParams();
    skinName = skinName.replace(/\s/g,'');
    console.log(skinName);
    params.set("name", skinName);
    return this.http.get('/api/skinImage', { search: params })
      .toPromise();
  }

  getInventory(): any {
    return this.http.get('/api/getInventory')
      .toPromise();
  }

  getOpskinsInventory(): any {
    return this.http.get('/api/getOpskinsInventory')
      .toPromise();
  }

  getUserInventory(): any {
    return this.http.get('/api/getUserInventory')
      .toPromise();
  }

  removeAuction(id): any {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    return this.http.delete('/api/removeAuction', { search: params}).toPromise();
  }
  getWear(link: string): any {
    let params = new URLSearchParams();
    params.set('link', link);
    return this.http.get('/api/wear', { search: params })
      .toPromise();
  }
}
