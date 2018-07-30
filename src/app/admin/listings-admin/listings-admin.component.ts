import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import * as _ from "lodash";

@Component({
  selector: 'app-listings-admin',
  templateUrl: './listings-admin.component.html',
  styleUrls: ['./listings-admin.component.css']
})
export class ListingsAdminComponent implements OnInit {
listings: any = null;
selectListing: any = null;
Math: any;
newPrice : number;
ourCut :number  = 0;
  constructor(private adminService: AdminService) { 
    this.Math = Math;
  }

  ngOnInit() {
    this.adminService.getAdmListings().then(res=>{
      this.listings = res;

      this.listings = _.sortBy(this.listings, [function(o) { return o.status; }]);

      this.listings.forEach(item=>{
        item.listDate = new Date(item.listDate).toLocaleDateString('en-GB');
        item.saleDate = new Date(item.saleDate).toLocaleDateString('en-GB');
      })
    })
  }

  cancelListing(listing){
    let data = {
      id: listing._id
    };
    this.adminService.cancelListing(data).then();
    let index = 0;
    this.listings.forEach(item=>{
      if(item._id === listing._id){
        this.listings.splice(index,1);
      }
      index ++;
    })
  }

  modifyListing(){
    let data = {
      id : this.selectListing._id,
      newPrice : this.newPrice
    };
    this.adminService.modifyListing(data).then();
    this.listings.forEach(listing=>{
      if(listing._id == this.selectListing._id){
        listing.salePrice = this.newPrice;
      }
    })
  }

  removeFromAdm(list){
    let listing = {
      id: list._id
    };
    this.adminService.removeFromAdm(listing).then();
    let index = 0;
    this.listings.forEach(listing=>{
      if(listing._id == list._id){
          this.listings.splice(index,1);
      }
      index ++;
    })
  }

}
