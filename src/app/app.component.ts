import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { AuthGuard } from './shared/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user: any;
  userLogged: Boolean =false;
  tradeUrl: String;
  tradeUrlInvalid: Boolean = false;
  auctionWon: any;
  showCookies: boolean = true;

  constructor(private service: UserService ,private authService: AuthGuard) {
  }
  ngOnInit() {

    this.service.currentUser.subscribe(user => this.user = user);
    this.service.getUser().subscribe(res => {
    if(res.user) {
    this.user = res.user;
    this.user.highRoller = false;
    this.userLogged = true;
    this.showCookies = this.user.showCookiePolicy !== undefined ? this.user.showCookiePolicy : true ;
    this.service.updateUser(this.user);
    localStorage.setItem('currentUser', JSON.stringify(res));
    this.service.socket.emit('setUserId', this.user.userid);

    this.service.checkAccess().subscribe(res=>{
      if(res)
        this.user.hasAccess = true;
    })
    }
    });

    this.service.socket.on('auctionWin',(auc)=>{
    document.getElementById('openWinModal').click();
    document.title = 'Winner !!';
    this.auctionWon = auc;
  });
  }

  updateUrl(){
    if(this.tradeUrl.includes('https://steamcommunity.com/tradeoffer')){
      this.service.updateTradeUrl(this.tradeUrl).subscribe();
    }
    else{
      this.tradeUrlInvalid = true;
    }
  }

  listShow(){
    document.getElementById('openListModal').click();
  }

  listAuction(){
    this.service.listAuction(this.auctionWon._id).subscribe(res => {
      if(res.listed){
        document.getElementById('openListSuccessModal').click();
      }
    });
  }

  hideCookiePolicy(){
    if(this.user.length !== undefined){
      this.service.hideCookiePolicy().subscribe(res=>{
        this.showCookies = false;
      });
    }
    else{
      this.showCookies = false;
    }



  }


  }
