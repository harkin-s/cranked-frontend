import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { auction } from '../admin/auction';
import {replace} from 'lodash';
import 'rxjs/add/operator/map';
@Injectable()
export class AuctionServices {

  constructor(private http: Http) {
  }

  // Get all posts from the API
  getAllAuctions() {
    return this.http.get('/api/auctions')
      .map(res => res.json());
  }

  addAuction(auction: auction) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put('/api/addAuction', JSON.stringify(auction), { headers: headers })
      .map(res => res.json());
  }

  getPrice(weaponName: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set("name", weaponName);
    return this.http.get('/api/getPrice', { search: params })
      .map(res => res.json());
  }

  getImage(skinName: string){
    let params: URLSearchParams = new URLSearchParams();
    skinName = skinName.replace(/\s/g,'');
    console.log(skinName);
    params.set("name", skinName);
    return this.http.get('/api/skinImage', { search: params })
      .map(res => res.json());
  }

  getInventory() {
    return this.http.get('/api/getInventory')
      .map(res => res.json());
  }

  getOpskinsInventory() {
    return this.http.get('/api/getOpskinsInventory')
      .map(res => res.json());
  }

  getUserInventory() {
    return this.http.get('/api/getUserInventory')
      .map(res => res.json());
  }

  removeAuction(id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    return this.http.delete('/api/removeAuction', { search: params}).map(res => res.json());
  }
  getWear(link: string) {
    let params = new URLSearchParams();
    params.set('link', link);
    return this.http.get('/api/wear', { search: params })
      .map(res => res.json());
  }
}
