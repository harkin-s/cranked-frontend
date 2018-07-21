import { Component, OnInit } from '@angular/core';
import { AuctionServices } from '../../shared/auctions.services';
import {remove} from 'lodash';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  activeAuctions = [];
  selectAuctionId;
  constructor(private service: AuctionServices) { }

  ngOnInit() {
    this.service.getAllAuctions().subscribe((res) => {
      this.activeAuctions = res;
    });
  }

  removeSelectAuction() {
    if(this.selectAuctionId){
      this.service.removeAuction(this.selectAuctionId).subscribe((res) => {
        remove(this.activeAuctions, (item) => {
          return item._id === this.selectAuctionId;
        });
        this.selectAuctionId = null;
      });
    }
  }

}
