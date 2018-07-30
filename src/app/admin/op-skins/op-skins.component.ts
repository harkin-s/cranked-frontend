import {Component, OnInit} from '@angular/core';
import {AuctionServices} from '../../shared/auctions.services';
import {filter, isEmpty} from 'lodash';
import {appendItems} from '../admin-shared';
import {auction} from '../auction';

@Component({
  selector: 'app-op-skins',
  templateUrl: './op-skins.component.html',
  styleUrls: ['./op-skins.component.css'],
})
export class OpSkinsComponent implements OnInit {
  filteredSkins = [];
  unFilteredSkins = [];
  pageItems: any;
  pageSize = 21;
  auction: auction = new auction();
  searchPara = '';

  constructor(private service: AuctionServices) {
  }

  ngOnInit() {
    this.service.getOpskinsInventory().subscribe(res => {
      this.unFilteredSkins = res;
      this.filteredSkins = res;
      this.pageItems = appendItems({allItems: this.filteredSkins, viewItems: this.pageItems, pageSize: this.pageSize});
    });
  }

  onScrollDown() {
    this.pageItems = appendItems({allItems: this.filteredSkins, viewItems: this.pageItems, pageSize: this.pageSize});
  }

  selectOPSkin(skin) {
    this.auction = new auction();
    this.auction.name = skin.name;
    this.service.getImage(`${skin.name}${skin.wear}`).subscribe(res => {
      this.auction.imageURL = res.url
    });
    this.auction.wear = skin.wear;
    this.auction.value = skin.price;
  }

  filterSkins(clear) {
    if (clear === true || this.searchPara === '') {
      this.filteredSkins = this.unFilteredSkins.length > this.filteredSkins.length ? this.unFilteredSkins : this.filteredSkins;
      this.pageItems = [];
      this.searchPara = '';
      this.pageItems = appendItems({allItems: this.filteredSkins, viewItems: this.pageItems, pageSize: this.pageSize});
    } else {
      this.filteredSkins = filter(this.unFilteredSkins, (skin) => {
        return skin.name.toLowerCase().includes(this.searchPara.toLowerCase());
      });
      this.pageItems = [];
      this.pageItems = appendItems({allItems: this.filteredSkins, viewItems: this.pageItems, pageSize: this.pageSize});
    }
  }
}
