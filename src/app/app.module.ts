import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MicroBidComponent } from './micro/micro-bid.component';
import { AuctionServices } from './shared/auctions.services';
import { routing } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokensComponent } from './tokens/tokens.component';
import { TosComponent } from "./tos/tos.component";
import { AuthGuard } from './shared/auth-guard.service';
import { UserService } from './shared/user.service';
import { PaymentService } from './shared/payment.service';
import { SharedModule } from './shared/shared.module';
import { PaypalExecuteComponent } from './paypal-execute/paypal-execute.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingsService } from './shared/listings.service';
import { PaymentPopupComponent } from './shared/components/payment-popup/payment-popup.component';
import { PaymentSuccessPopupComponent } from './shared/components/payment-success-popup/payment-success-popup.component';
import { TicketViewComponent } from './shared/components/ticket-view/ticket-view.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AboutComponent } from './about/about.component';
import { SupportComponent } from './support/support.component';
import { FaqComponent } from './faq/faq.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { WinsComponent } from './wins/wins.component';
 
@NgModule({
  declarations: [
    AppComponent,
    MicroBidComponent,
    TokensComponent,
    PaypalExecuteComponent,
    AccountPageComponent,
    ListingsComponent,
    PaymentPopupComponent,
    PaymentSuccessPopupComponent,
    CookiePolicyComponent,
    LeaderboardComponent,
    AboutComponent,
    SupportComponent,
    TosComponent,
    FaqComponent,
    TicketViewComponent,
    AffiliatesComponent,
    WinsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [AuctionServices, AuthGuard, UserService, PaymentService, ListingsService],
  bootstrap: [AppComponent],
  exports: []
})

export class AppModule {}
