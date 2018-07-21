import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ListingsService{

    constructor(private http: HttpClient ){}

    getListings(){
        return this.http.get('/api/getListings').map(res => res)
    }





}
