import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent {
  alerts = [
    {
      id: 1,
      message: 'Bracelet #BR12345 is offline.',
      timestamp: '2025-03-15 09:45 AM',
      status: 'unresolved',
      patientName: 'John Doe',
      braceletSerial: 'BR12345',
    },
    {
      id: 2,
      message: 'Patient has left the authorized zone.',
      timestamp: '2025-03-15 08:30 AM',
      status: 'resolved',
      patientName: 'Marie Dupont',
      braceletSerial: 'BR45678',
    },
    {
      id: 3,
      message: 'Low battery detected.',
      timestamp: '2025-03-14 03:15 PM',
      status: 'unresolved',
      patientName: 'Jane Smith',
      braceletSerial: 'BR78901',
    },
  ];

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/assigned-bracelets']);
  }
}
