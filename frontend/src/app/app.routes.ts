import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {AuthComponent} from './features/auth/auth.component';
import {OrderComponent} from './features/order/order.component';
import {AdminDashboardComponent} from './features/admin/admin-dashboard/admin-dashboard.component';
import {ClientDashboardComponent} from './features/client/client-dashboard/client-dashboard.component';
import {AuthGuard} from './core/guards/auth.guard';
import {UserManagementComponent} from './features/admin/user-management/user-management.component';
import {OrderListComponent} from './features/admin/order-management/order-list/order-list.component';
import {ForbiddenComponent} from './shared/components/forbidden/forbidden.component';
import {RoleGuard} from './core/guards/role.guard';
import {ProfileComponent} from './features/profile/profile.component';
import {AssignedBraceletsComponent} from './features/client/assigned-bracelets/assigned-bracelets.component';
import {TrackPatientComponent} from './features/client/track-patient/track-patient.component';
import {AlertsComponent} from './features/client/alerts/alerts.component';
import {BraceletManagementComponent} from './features/admin/bracelet-management/bracelet-management.component';

export const routes: Routes = [
  // public routes
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard],
    data: {redirectIfAuthenticated: true}
  },
  {path: 'commande', component: OrderComponent},

  // protected routes
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  // routes for admin
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'order-management',
    component: OrderListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'bracelet-management',
    component: BraceletManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_ADMIN']}
  },

  // routes for clients
  {
    path: 'dashboard',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_USER']}
  },
  {
    path: 'assigned-bracelets',
    component: AssignedBraceletsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_USER']}
  },
  {
    path: 'patient-tracking/:patientId',
    component: TrackPatientComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_USER']}
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_USER']}
  },

  // Route pour accès interdit
  {path: 'forbidden', component: ForbiddenComponent},

  // Route wildcard pour les URL non trouvees
  {path: '**', redirectTo: ''}
];
