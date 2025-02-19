import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/login/login.component';
import {OrderComponent} from './features/order/order.component';
import {AdminDashboardComponent} from './features/admin/admin-dashboard/admin-dashboard.component';
import {ClientDashboardComponent} from './features/client/client-dashboard/client-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'commande', component: OrderComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'dashboard', component: ClientDashboardComponent }
];
