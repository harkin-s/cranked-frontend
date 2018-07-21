import { AffiliatesComponent } from './affiliates/affiliates.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MicroBidComponent } from './micro/micro-bid.component';
import { CoinComponent } from './coin/coin.component';
import { TokensComponent } from './tokens/tokens.component';
import { AuthGuard } from './shared/auth-guard.service';
import { AccountPageComponent } from './account-page/account-page.component';
import { PaypalExecuteComponent } from './paypal-execute/paypal-execute.component';
import { ListingsComponent } from './listings/listings.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { TosComponent } from './tos/tos.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AboutComponent } from './about/about.component';
import { SupportComponent } from './support/support.component';
import { FaqComponent } from './faq/faq.component';
import { WinsComponent } from './wins/wins.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/micro',
        pathMatch: 'full'
    },
    {
        path: 'micro',
        component: MicroBidComponent
    },

    {
        path: 'coin',
        component: CoinComponent
    },
    {
        path: 'paypal-execute',
        component: PaypalExecuteComponent
    },
    {
        path: 'tokens',
        component: TokensComponent
    },
    {
        path: 'account',
        component: AccountPageComponent
    },
    {
        path : 'listings',
        component: ListingsComponent
    },
    {
        path: 'cookie-policy',
        component: CookiePolicyComponent
    },
    {
        path:'terms-of-service',
        component: TosComponent
    },
    {
        path:'about',
        component: AboutComponent
    },
    {
        path: 'leaderboard',
        component : LeaderboardComponent
    },
    {
        path: 'support',
        component: SupportComponent
    },
    {
        path: 'affiliates',
        component: AffiliatesComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'wins',
        component: WinsComponent
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: './admin/admin.module#AdminModule'
    }


];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
