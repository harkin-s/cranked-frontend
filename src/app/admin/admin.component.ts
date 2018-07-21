import {Component, OnInit} from '@angular/core';
import {auction} from './auction';
import {AuctionServices} from '../shared/auctions.services';
import {animate, style, transition, trigger} from '@angular/animations';
import {IMyDpOptions} from 'mydatepicker';
import {appendItems} from './admin-shared';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('.75s ease-out', style({opacity: '1'})),
      ]),
    ]),
  ],
})

export class AdminComponent implements OnInit {
  inventory: any = [];
  pageInventory: any = [];
  activeAuctions: any = [];
  toRemove: any;
  skinChoosen: boolean = false;
  sourceOptions: any = ['Bot Inv', 'OpSkins'];
  source: string = '';
  skin: any = {};
  numberOfPages: number = 0;
  currentPage: number = 0;
  selectDate: any;
  startHour: number;
  startMinutes: number;
  activeTab: number = 1;
  timeRemaining: number;
  numToStart: number = 0;
  priceIncrese: number = 0;
  timeIncrese: number = 0;
  auction = new auction();

  constructor(private service: AuctionServices) {
  }

  ngOnInit() {
    this.getInventory();
  }

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };


  submitted = false;

  onScrollDown() {
    this.pageInventory = appendItems({allItems: this.inventory.descriptions, viewItems: this.pageInventory, pageSize: 16});
  }

  onSubmit() {
    this.submitted = true;
    let date = new Date(this.selectDate.jsdate);
    date.setHours(this.startHour);
    date.setMinutes(this.startMinutes);
    this.auction.startDate = date;
    this.auction.priceIncrease = (this.auction.priceIncrease / 100);
    const item = _.find(this.activeAuctions, {
      'assetid': this.auction.assetid,
      'appid': this.auction.appid,
      'contextid': this.auction.contextid
    });
    if (item === undefined) {
      this.service.addAuction(this.auction).subscribe();
      //Remove added auction from descriptions
      // _.remove(this.inventory.descriptions, (item) => {
      //   return (item.assetid === this.auction.assetid && item.contextid === this.auction.contextid && item.appid === this.auction.appid);
      // });
      // Remove from page view
      _.remove(this.pageInventory, (item) => {
        return (item.assetid === this.auction.assetid && item.contextid === this.auction.contextid && item.appid === this.auction.appid);
      });
      var numTo = Math.ceil(this.inventory.descriptions.length / 12);
      this.numberOfPages = _.range(1, (numTo + 1));
      this.auction = new auction();
    }
    else {
      alert('Auction Already exists');
    }

  }

  getInventory() {
    //Remove any unwanted items from inventory
    this.service.getInventory().subscribe(res => {
      this.inventory = res;

      //Remove unmarktable items
      _.remove(this.inventory.descriptions, (item) => {
        return (!(item.tags[1].category == 'Weapon'));
      });

      //Add asset id and context id for UID
      this.inventory.descriptions.forEach((item) => {
        const asset = _.find(this.inventory.assets, {'classid': item.classid});
        item.assetid = asset.assetid;
        item.contextid = asset.contextid;
      });

      //Remove auctions that are already live
      this.activeAuctions.forEach(element => {
        _.remove(this.inventory.descriptions, (inv) => {
          return (inv.assetid == element.assetid && inv.contextid == element.contextid && inv.appid == element.appid);
        });
      });

      for (var i = 0; i < this.inventory.descriptions.length; i++) {
        this.inventory.descriptions[i].icon_url_large = 'http://cdn.steamcommunity.com/economy/image/' + this.inventory.descriptions[i].icon_url_large;
        var wear = this.inventory.descriptions[i].market_name.match(/\(([^)]+)\)/);
        if (wear != undefined)
          this.inventory.descriptions[i].wear = wear[1];

      }
      this.pageInventory = appendItems({allItems: this.inventory.descriptions, viewItems: this.pageInventory, pageSize: 16});
    });
    this.skinChoosen = true;   //hidden boolea
  }

  selectSkin(inv) {
    this.auction = new auction();
    this.auction.name = inv.name;
    this.service.getPrice(inv.market_hash_name).subscribe(res => {
      this.auction.value = res;
    });
    var link = inv.actions[0].link;
    var address = link.replace('%owner_steamid%', '76561198076790795').replace('%assetid%', inv.assetid);
    this.auction.imageURL = inv.icon_url_large;
    this.auction.assetid = inv.assetid;
    this.auction.contextid = inv.contextid;
    this.auction.appid = inv.appid;
    this.auction.wear = inv.wear;
    this.auction.inspectLink = inv.market_actions[0];

  }


  cancelSubmit() {
    for (let item of this.inventory.descriptions) {
      item.selectedSkin = false;
    }
    this.auction = new auction();
  }

}



