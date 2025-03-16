import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Alert } from '../../../shared/models/alert.model';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, SidebarComponent], // Supprimez le doublon de SidebarComponent
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [
    {
      id: 1,
      message: 'Bracelet #BR12345 has low battery',
      timestamp: '2025-03-15T09:45:00',
      status: 'UNRESOLVED',
      type: 'LOW_BATTERY',
      bracelet: {
        id: 1,
        serialNumber: 'BR12345',
        color: 'color',
        state: 'ASSIGNED',
        status: 'LOW_BATTERY',
        patient: {
          id: 1,
          username: 'John Doe',
          dateOfBirth: '1990-01-01',
          user: {
            id: 6,
            username: 'string',
            email: "test@gmail.com",
            role: 'string',
            address: 'string',
            phoneNumber: 'string',
          },
        },
      },
    },
    {
      id: 2,
      message: 'Bracelet #BR12345 has low battery',
      timestamp: '2025-03-15T09:45:00',
      status: 'UNRESOLVED',
      type: 'LOW_BATTERY',
      bracelet: {
        id: 1,
        serialNumber: 'BR12345',
        color: 'color',
        state: 'ASSIGNED',
        status: 'LOW_BATTERY',
        patient: {
          id: 1,
          username: 'John Doe',
          dateOfBirth: '1990-01-01',
          user: {
            id: 6,
            username: 'string',
            email: "test@gmail.com",
            role: 'string',
            address: 'string',
            phoneNumber: 'string',
          },
        },
      },
    },
    {
      id: 3,
      message: 'Bracelet #BR12345 has low battery',
      timestamp: '2025-03-15T09:45:00',
      status: 'UNRESOLVED',
      type: 'LOW_BATTERY',
      bracelet: {
        id: 1,
        serialNumber: 'BR12345',
        color: 'color',
        state: 'ASSIGNED',
        status: 'LOW_BATTERY',
        patient: {
          id: 1,
          username: 'John Doe',
          dateOfBirth: '1990-01-01',
          user: {
            id: 6,
            username: 'string',
            email: "test@gmail.com",
            role: 'string',
            address: 'string',
            phoneNumber: 'string',
          },
        },
      },
    },
  ];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.isLoading = true;
    // Simulation d'un chargement (optionnel)
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // Délai de 1 seconde pour simuler un appel réseau
  }

  goBack(): void {
    this.router.navigate(['/assigned-bracelets']);
  }
}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
// import {Alert} from '../../../shared/models/alert.model';
// import {AlertService} from '../../../core/services/alert.service';
//
// @Component({
//   selector: 'app-alerts',
//   standalone: true,
//   imports: [CommonModule, SidebarComponent, SidebarComponent],
//   templateUrl: './alerts.component.html',
//   styleUrls: ['./alerts.component.css'],
// })
// export class AlertsComponent implements OnInit {
//   alerts: Alert[] = [];
//   isLoading = false;
//   errorMessage: string | null = null;
//
//   constructor(private alertService: AlertService, private router: Router) {}
//
//   ngOnInit(): void {
//     this.loadAlerts();
//   }
//
//   loadAlerts(): void {
//     this.isLoading = true;
//     this.errorMessage = null;
//     this.alertService.getAllAlerts().subscribe({
//       next: (alerts) => {
//         this.alerts = alerts;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         this.isLoading = false;
//         this.errorMessage = 'Failed to load alerts. Please try again.';
//         console.error('Error loading alerts:', err);
//       },
//     });
//   }
//
//   goBack(): void {
//     this.router.navigate(['/assigned-bracelets']);
//   }
// }
