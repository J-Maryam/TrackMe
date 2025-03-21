import { Component } from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-client-dashboard',
  imports: [
    SidebarComponent
  ],
  templateUrl: './client-dashboard.component.html',
  standalone: true,
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {
  activeBracelets = 3;
  recentAlerts = 2;
  lowBattery = 1;
  lastLocation = 'Paris, France';
}
