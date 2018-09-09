import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { AuthGuard } from './shared/auth-guard.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user: User = new User(null, false, null, false) ;
  userLogged: Boolean = false;
  tradeUrl: String;
  tradeUrlInvalid: Boolean = false;
  auctionWon: any;
  showCookies: boolean = true;

  constructor(private service: UserService ,private authService: AuthGuard) {
  }
  async ngOnInit() {

    const {user:user} = await this.service.getUser();
    
    if(user) {
      this.user = new User(user.userId, false, user.tokens, user.showCookiePolicy);
      this.service.updateUser(this.user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.service.socket.emit('setuserId', this.user.userId);
    }

   console.log(this.user)

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
    if(this.user.showCookiePolicy !== undefined){
      this.service.hideCookiePolicy().subscribe(res=>{
        this.showCookies = false;
      });
    }
    else{
      this.showCookies = false;
    }



  }


  }
