import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from "@angular/common";
import { UserService } from '../shared/user.service';
import { PaymentService } from '../shared/payment.service';
import { OrderByPipe } from '../shared/pipes/orderby.pipe';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})

export class AccountPageComponent implements OnInit {
  user: any;
  userObj: any
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'ticketNum';
  direction: number = 1;
  Math: any;
  transactions: Array<any>;
  receiverID: String;
  ticket: any = {};
  viewTicket = false;
  receiverAmt: Number;
  sendError: Boolean = false;
  errorMessage: String;

  constructor(private userService: UserService, private location: PlatformLocation,
    private paymentService: PaymentService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.userObj = user);
    this.userService.getUserInfo().then((res) => {
      this.user = res[0];
      var newDate = new Date(this.user.joinDate)
      this.user.joinDate = newDate.toLocaleDateString('en-GB');

      this.records = res[0].tickets;
      this.records.forEach(tic => {
        //To format the date created string
        var newDate = new Date(tic.dateCreated)
        tic.dateCreated = newDate.toLocaleDateString('en-GB');
        // TO format last updated string
        var lastUpdatedDate = new Date(tic.updated[tic.updated.length - 1]);
        var currentDate = new Date();
        tic.lastUpdatedDiff = (currentDate.getTime() - lastUpdatedDate.getTime()) / (1000 * 60);
        tic.lastUpdatedFormated = lastUpdatedDate.toLocaleString('en-GB');
        // Format message dates
        tic.messages.forEach(message => {
          var nDate = new Date(message.date);
          message.date = nDate.toLocaleString('en-GB');
        });


      });

      this.transactions = this.user.transactions;
      this.transactions.forEach(tran => {
        tran.date = new Date(tran.date).toLocaleDateString('en-GB');
        tran.selected = false;
      });

      this.user.auctionsWon.forEach(auc => {
        auc.winDate = new Date(auc.winDate).toLocaleDateString('en-GB');
      });

      this.user.saleHistory.forEach(sale => {
        sale.listDate = new Date(sale.listDate).toLocaleDateString('en-GB');
        sale.saleDate = new Date(sale.saleDate).toLocaleDateString('en-GB');
      });
    })
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };

  selectTransaction(tran) {
    if (tran.method === 'Skin') {
      tran.selected = !tran.selected;
    }
  }

  selectTicket(ticket) {
    this.ticket = ticket;
    this.viewTicket = !this.viewTicket;
  }

  goBack() {
    this.viewTicket = false;
  }
  sendTokens() {
    let receiver = {
      id: this.receiverID,
      amt: this.receiverAmt
    };

    if (this.user.tokens >= this.receiverAmt) {

      this.userService.transferTokens(receiver).then(res => {
        if (res.error) {
          this.sendError = true;
          this.errorMessage = res.mes;
          setTimeout(function () {
            this.sendError = false;
            this.errorMessage = null;
          }.bind(this), 4000)
        }
        else {
          this.user.tokens = res.newBal;
          this.sendError = false;
          this.errorMessage = res.mes;
          this.userObj.tokens = res.newBal;
          this.userService.updateUser(this.userObj);
          setTimeout(function () {
            this.sendError = false;
            this.errorMessage = null;
          }.bind(this), 4000)
        }
      });
    }
    else {
      this.sendError = true;
      this.errorMessage = 'You do not have enough Tokens';
      setTimeout(function () {
        this.sendError = false;
        this.errorMessage = null;
      }.bind(this), 4000)
    }

  }

  unlistAndClaim(id) {
    let item = {
      listingId: id
    };
    this.userService.removeListing(item).then();
    let index = 0;
    this.user.saleHistory.forEach(sale => {
      if (sale._id === id) {
        this.user.saleHistory.splice(index, 1);
      }
      index++;

    })
  }

  cancelSubscription() {
    this.paymentService.cancelStripeSubscription()
      .then(res => {
        console.log(res);
        if (res.status === 'canceled') {
          this.user.subscriptionStatus = 'cancelled';
          this.userService.updateUser(this.user);
        }
      });
  }

}
