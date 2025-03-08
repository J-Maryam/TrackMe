import { Component } from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor() {}
}
