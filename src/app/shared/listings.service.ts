import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class ListingsService{

    constructor(private http: HttpClient ){}

    getListings(): any{
        try{
            const res = this.http.get(`${environment.apiUrl}/getListings`).toPromise();
            return res;
        }
        catch(err){
            console.log(err);
            return {}
        }

    }





}
