import { Component, OnInit } from '@angular/core';
import { OrderByPipe } from '../../shared/pipes/orderby.pipe';
import { UserListService } from '../shared/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
direction: number = 1;
isDesc: boolean = false;
column: string = '_id';
records: Array<any> = [];
Math: any;
tokens: number;
user: any;


constructor(private userListService: UserListService) { 
  this.Math = Math;
}

  ngOnInit() {
    this.userListService.getUsers().then((res)=>{
      this.records = res;
      var now = new Date();
      // Format all of the records into the relevent fileds
      this.records.forEach(user=>{
        let joinDate = new Date(user.joinDate);
        user.memberSince = (now.getTime() - joinDate.getTime()) / (1000 * 60 *60);
        if(user.memberSince > 24 && user.memberSince < 720){
          user.memberSince = user.memberSince / 24;
          user.memberSince = Math.round(user.memberSince) + ' Days ago';    
        }
        else if (user.memberSince > 720 && user.memberSince < 8640){
          user.memberSince = user.memberSince / 720;
          user.memberSince = Math.round(user.memberSince) + ' Months ago';   
        }
        else if (user.memberSince > 8640){
          user.memberSince = user.memberSince / 8640;
          user.memberSince = Math.round(user.memberSince) + ' Years ago'; 
        }
        else{
          user.memberSince = Math.round(user.memberSince) + ' Hours ago';
        }
        user.optionsActive = false;
        user.tokensPurchased = 0;
        if(user.purchaseHistory){
          user.purchaseHistory.forEach(purch=>{
            user.tokensPurchased += purch.tokens
          });
        }
        else{
          user.tokensPurchased = 0;
        }


        user.tokensSpent = user.tokensPurchased - user.tokens;
      })
    });
  };

  selectUser(user){
    user.optionsActive = !user.optionsActive;
    this.user = user;
  }

  giveTokens(){
    let data ={
      userid: this.user._id,
      tokens: this.tokens
    }
    this.userListService.giveTokens(data).then();
    this.user.tokens += this.tokens;
  }
  banUser(value){
    let data = {
      userid: this.user._id,
      value: value
    };
    this.userListService.banUser(data).then();
    this.user.isBanned = value;
  }
  takeTokens(){
    let data ={
      userid: this.user._id,
      tokens: this.tokens
    }
    this.userListService.takeTokens(data).then();
    this.user.tokens -= this.tokens;
  }

  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };
}
