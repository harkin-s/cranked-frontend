import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../shared/user.service';
import {PaymentPopupComponent} from '../shared/components/payment-popup/payment-popup.component';
import * as moment from 'moment';

@Component({
  selector: 'app-wins',
  templateUrl: './wins.component.html',
  styleUrls: ['./wins.component.css']
})

export class WinsComponent implements OnInit {
  @ViewChild(PaymentPopupComponent) paymentsPopup: PaymentPopupComponent;
  wins: any = [];
  selectedAuction: any;
  skinValue: any;
  position = 'above';
  tooltipMessage = '';

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.service.getUserWins().then(res => {
      this.wins = res;
      this.wins.map(win =>{
        if(win.payedDate){
          const winDate = moment(win.payedDate).add(7, 'days');
          const laterDate = moment().isBefore(winDate);
          console.log(laterDate);
          if(laterDate){
            const timeInSec = moment.duration(moment().diff(winDate)).as('s');

            console.log(win.readyIn);
          }
          else {
            win.actionTaken = 'withdrawn';
          }
        }
      })
    });
  }

  openPaymentsPopup(paymentType, paymentValue) {
    this.paymentsPopup.initialize(paymentType, paymentValue);
  }

  claim(win: any) {
    const {payedFor, finalPrice} = win;
    if (!payedFor) {
      document.getElementById('claimModalButton').click();
    }
    else {
      this.openPaymentsPopup('single', finalPrice);
      document.getElementById('paymentPopupButton').click();
    }
  }

  keepSkin() {
    this.service.keepSkin(this.selectedAuction.id).subscribe(res => {
      if (res.claimed) {
        this.wins.map(win => {
          if (win.id === this.selectedAuction.id) {
            win.actionTaken = 'claimed';
          }
        });
      }
    });
  }

  convertSkin() {
    const marketName = `${this.selectedAuction.name} (${this.selectedAuction.wear})`;
    this.service.convertSkin(this.selectedAuction.id, marketName).subscribe(res => {
      if (res.converted) {
        this.wins.map(win => {
          if (win.id === this.selectedAuction.id) {
            win.actionTaken = 'converted';
          }
        })
      }
    });
  }


  getSkinValue() {

    const marketName = `${this.selectedAuction.name} (${this.selectedAuction.wear})`;

    this.service.getSkinValue(marketName).subscribe(res => {
      this.skinValue = res.skinTokenValue;
      document.getElementById('skinValueModalButton').click();
    });

  }

  listSkin() {
    this.service.listAuction(this.selectedAuction.id).subscribe(res => {
      console.log(res);
      if (res.listed) {
        this.wins.map(win => {
          if (win.id === this.selectedAuction.id) {
            win.actionTaken = 'listed'
          }
        });
      }
    });

  }

  selectSkin(skin) {
    console.log(skin);
    const date = new Date(skin.winDate).toDateString();
    this.tooltipMessage = `Won on ${date}`;
    this.selectedAuction = skin;
  }


}
