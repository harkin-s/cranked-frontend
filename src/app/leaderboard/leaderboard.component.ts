import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
// import { OrderByPipe } from '../shared/pipes/orderby.pipe';
import * as _ from 'lodash';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
records: Array<any> = [];
direction: number = 1;
isDesc: boolean = false;
column: string = 'rank';

  constructor(private userService: UserService ) { }

  ngOnInit() {
    this.userService.getLeaderboard().subscribe(res => {

      res = _.sortBy(res, [function(u) { return u.auctionsWon.length; }]);
      let rank = 1;
      for(let user of res){
        user.rank = rank;
        rank ++;
        user.memberSince = new Date(user.joinDate).toLocaleDateString('en-GB');
        user.tokensAcquired = 0;
        user.amountSaved
      }

      this.records = res;
    });
  }

  sort(property){
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };

}
