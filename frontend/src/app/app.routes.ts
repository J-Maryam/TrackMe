import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/login/login.component';
import {OrderComponent} from './features/order/order.component';
import {AdminDashboardComponent} from './features/admin/admin-dashboard/admin-dashboard.component';
import {ClientDashboardComponent} from './features/client/client-dashboard/client-dashboard.component';
import {AuthGuard} from './core/guards/auth.guard';
import {UserManagementComponent} from './features/admin/user-management/user-management.component';
import {OrderListComponent} from './features/admin/order-management/order-list/order-list.component';
import {ForbiddenComponent} from './shared/components/forbidden/forbidden.component';
import {RoleGuard} from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'commande', component: OrderComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: ClientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  {
    path: 'order-management',
    component: OrderListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  { path: 'forbidden', component: ForbiddenComponent },

];
