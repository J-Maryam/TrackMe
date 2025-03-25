import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AdminService, AdminStats, Alert } from '../../../core/services/admin.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [SidebarComponent, RouterLink, NgFor, NgIf, NgClass, TitleCasePipe]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  stats: AdminStats | null = null;
  alerts: Alert[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadData(): void {
    this.subscriptions.push(
      this.adminService.getStats().subscribe({
        next: (stats) => this.stats = stats,
        error: (err) => console.error('Error loading stats:', err)
      }),
      this.adminService.getAlertHistory().subscribe({
        next: (alerts) => this.alerts = alerts,
        error: (err) => console.error('Error loading alerts:', err)
      })
    );
  }
}
