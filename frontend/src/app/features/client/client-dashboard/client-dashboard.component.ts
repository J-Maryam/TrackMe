import { Component, AfterViewInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import * as L from 'leaflet';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-client-dashboard',
  imports: [SidebarComponent, NgIf, NgForOf],
  templateUrl: './client-dashboard.component.html',
  standalone: true,
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {
  activeBracelets = 7;
  recentAlerts = 4;
  batteryAverage = 82;

  patientLocations: { lat: number; lng: number; name: string }[] = [
    { lat: 48.8566, lng: 2.3522, name: 'Patient 1 - Paris' },
    { lat: 51.5074, lng: -0.1278, name: 'Patient 2 - Londres' },
    { lat: 40.7128, lng: -74.0060, name: 'Patient 3 - New York' }
  ];
}
