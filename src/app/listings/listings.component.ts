import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../shared/listings.service';
import * as _ from "lodash";
@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
listings: any = null;
selectListing : any;
search: String = '';
originalListings : any = null;
  constructor(private listingService : ListingsService) { }

  ngOnInit() {
    this.listingService.getListings().subscribe(res=>{
      this.listings = res;
      this.originalListings = res;
    });
  }

  filter(){
    if(this.search === ''){
      this.listings = this.originalListings;
    }
    else{
      this.listings = _.filter(this.originalListings,(skin)=>{
        return skin.skinName.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }

}
