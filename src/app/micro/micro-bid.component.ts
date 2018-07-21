import { Component, OnInit } from '@angular/core';
import { AuctionServices } from '../shared/auctions.services';
import { Observable, Subscription } from 'rxjs/Rx';
import { trigger,state,style,animate,transition} from '@angular/animations';
import { UserService } from '../shared/user.service';
import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: 'micro-bid',
  templateUrl: './micro-bid.component.html',
  styleUrls: ['./micro-bid.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class MicroBidComponent implements OnInit {
  auctions: any = [];
  highAuctions :any = [];
  lowAuctions:any= [];
  private socket;
  private countDown;
  Math:any;
  user:any;
  Moment:any;
  tokenLimit: Number = null;
  autoBidItems: any = {};
  timer : any;
  autoBidOn: Boolean = false;


  constructor(private service: AuctionServices, private userService: UserService) {
    this.countDown = Observable.timer(0,1000);
    this.Math = Math;
    this.Moment = moment;

  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user=>this.user = user);
    this.service.getAllAuctions().subscribe(auc =>{
    this.auctions = auc;
    _.forEach(this.auctions, (auc) =>{
      if (auc.auctionLive) {
      const date = new Date(auc.startDate).toDateString();
      auc.startDate = date;
      const UTCTime = new Date();
      auc.userAutoBid = false;
      auc.tokenLimit = -1;
      auc.userSpentTokens = 0;
      const diff = ((( UTCTime.getTime() - auc.startTimeMS ) / 1000)); //Finds difference in start time and current
      auc.timeRemaining = (auc.initialStartTime - diff) + auc.totalTimeAdded;
      }
    else{
      auc.startCountdown = ((( auc.startTimeMS - new Date().getTime() ) / 1000));
    }
    });
  });

  this.userService.socket.on('bidUpdate', ({id, price, time, bid, bids, ...data}) => {

     _.forEach(this.auctions, (auc) => {
       if(auc._id === id)
       {
          auc.currentPrice = price;
          auc.timeRemaining = time;
          auc.bids.push(bid);
       }
     });

     const autoBidItem = this.autoBidItems[id];
     if (autoBidItem && bids[0].userid === this.user.userid && autoBidItem.maxAmt < autoBidItem.amtSpent + autoBidItem.bidCost) {
      this.bid(autoBidItem);
     }
    });

  this.userService.socket.on('tick', () => {
    _.forEach(this.auctions, (auc) => {
      if(auc.auctionLive && auc.timeRemaining > 1 ){
        --auc.timeRemaining;
      }
      else if(!auc.activeLive){
        --auc.startCountdown;
      }
      else if(auc.timeRemaining <= 0 && auc.auctionLive){
        auc.finished = true;
      }

    });
  });

    this.userService.socket.on('auctionStart', (startAuc) => {
    _.forEach(this.auctions,(auc, index)=>{
      if(auc._id === startAuc._id){
        this.auctions.splice(index,1);
        startAuc.startDate  = new Date(startAuc.startDate).toDateString();
        startAuc.auctionLive = true;
        this.auctions.push(startAuc);
      }
    });
  });

    this.userService.socket.on('auctionUpdate',(uAuc) => {
    _.forEach(this.auctions,(auc, index) => {
      if(auc._id === uAuc._id){
        this.auctions.splice(index,1);
        this.auctions.push(uAuc);
      }
    });
  });

    this.userService.socket.on('playerReady', (updateAuc)=>{
    _.forEach(this.auctions,(auc)=>{
      if(auc._id === updateAuc._id){
        auc.biddersReady = updateAuc.biddersReady;
      }
    });
  });
  }

  bid(skin){
    if(this.user.tokens >= skin.bidCost){
      let bid = {
        userName: this.user.username,
        userId: this.user.userid,
        aucId: skin._id
      };this.userService.socket.emit('bid',bid);
    this.user.tokens -= skin.bidCost;
    }
  }

  setAutoBid({_id, ...skin}) {
    if (!this.autoBidItems[_id]) {
      skin.maxAmt = this.tokenLimit;
      skin.amtSpent = 0;
      this.autoBidItems[_id] = skin;
    }
    else {
      delete this.autoBidItems[_id];
      console.log(this.autoBidItems);
    }
    // this.autoBidOn = !this.autoBidOn;
    // for(let auc of this.auctions){
    //   if(auc._id === item._id){
    //     auc.userAutoBid = !auc.userAutoBid;
    //   }
    // }
    //
    // if(this.autoBidOn){
    //   this.timer = setInterval(()=>{
    //     for(let auc of this.auctions){
    //       let userId = auc.bids.length > 0 ? auc.bids[auc.bids.length-1].userid : null;
    //       if((auc.userAutoBid && (userId !== this.user.userid) || userId == null) ){
    //         if(auc.tokenLimit < 0){
    //            this.bid(item);
    //         }
    //         else if(auc.tokenLimit > 0 && auc.tokenLimit >= auc.userSpentTokens + auc.bidCost){
    //           this.bid(item)
    //         }
    //         else if (auc.tokenLimit > 0 && auc.token >= auc.userSpenTokens){
    //           auc.userAutoBid = false;
    //         }
    //       }
    //     }
    //   }, 1000);
    // }
    // else{
    //   clearInterval(this.timer);
    // }

  }


  removeAuction(id){    //Remove the completed auction
    var index = 0;
    _.forEach(this.auctions, (ele) => {
      if(ele._id == id){
        var auctionEnd = {
          winnerID: 'User ID of winner'
        };
        this.auctions.splice(index,1, auctionEnd);
      }
      ++index;
    });
  }

  removeAlert(alert){   //Remove the alert notification of auction over
    var index = 0;
    _.forEach(this.auctions,(ele)=>{
      if(ele === alert){
        this.auctions.splice(index,1);
      }
      ++index;
    })
  }

  wantThis(auc){
    if(this.user.tokens > 0){
    let data = {
      auc: auc,
      user: this.user
    };
      this.userService.socket.emit('userWant', data);
    }
    }
}
