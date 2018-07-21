import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminSupportComponent} from './admin-support/admin-support.component';
import {AuthGuard} from '../shared/auth-guard.service';
import {UserListComponent} from './user-list/user-list.component';
import {ListingsAdminComponent} from './listings-admin/listings-admin.component';
import {OpSkinsComponent} from './op-skins/op-skins.component';
import {RemoveComponent} from './remove/remove.component';


export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    component: AdminSupportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listings',
    component: ListingsAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'op-skins',
    component: OpSkinsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'remove',
    component: RemoveComponent,
    canActivate: [AuthGuard]
  }
];


export const AdminRouting: ModuleWithProviders = RouterModule.forChild(routes);
