import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionServices } from '../shared/auctions.services';
import { AdminRouting } from './admin.routes';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminSupportComponent } from './admin-support/admin-support.component';
import { AdminService } from './shared/admin.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserListService } from './shared/user-list.service';
import { ListingsAdminComponent } from './listings-admin/listings-admin.component';
import { OpSkinsComponent } from './op-skins/op-skins.component';
import { RemoveComponent } from './remove/remove.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSupportComponent,
    UserListComponent,
    ListingsAdminComponent,
    OpSkinsComponent,
    RemoveComponent
  ],
  imports: [
    AdminRouting,
    SharedModule,
    CommonModule,
    FormsModule
  ],
  providers: [AuctionServices, AdminService, UserListService],
})
export class AdminModule {}
