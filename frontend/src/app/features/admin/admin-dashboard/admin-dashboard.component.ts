import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AdminService, AdminStats, Alert } from '../../../core/services/admin.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Bracelet } from '../../../shared/models/bracelet.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [SidebarComponent, RouterLink, NgFor, NgIf, NgClass, TitleCasePipe, BaseChartDirective],
})
export class AdminDashboardComponent implements OnInit {
  stats: AdminStats | null = null;
  alerts: Alert[] = [];
  bracelets: Bracelet[] = [];
  users: { id: string; name: string; role: string }[] = [];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Alerts per Day',
        borderColor: '#F4A261',
        backgroundColor: 'rgba(244, 162, 97, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        data: [],
        label: 'Active Bracelets',
        borderColor: '#3498DB',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        data: [],
        label: 'Success Rate (%)',
        borderColor: '#2ECC71',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        fill: true,
        tension: 0.4
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Valeurs' } },
      x: { title: { display: true, text: 'Jours' } }
    },
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: { label: (context) => `${context.dataset.label}: ${context.raw}` }
      }
    }
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe((stats) => {
      this.stats = stats;
      console.log('Client number:', stats.totalClients);
      this.updateChartData();
    });

    this.adminService.getAlertHistory().subscribe((alerts) => {
      this.alerts = alerts;
      this.updateChartData();
    });

    this.adminService.getBracelets().subscribe((bracelets) => {
      this.bracelets = bracelets;
      this.updateChartData();
    });

    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  updateChartData(): void {
    if (!this.alerts.length || !this.bracelets.length || !this.stats) return;

    const days = 7;
    const today = new Date();
    const labels: string[] = [];
    const alertsPerDay: number[] = [];
    const activeBraceletsPerDay: number[] = [];
    const successRatePerDay: number[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
      labels.push(dayLabel);

      const alertsCount = this.alerts.filter(alert => {
        const alertDate = new Date(alert.time);
        return alertDate.toDateString() === date.toDateString();
      }).length;
      alertsPerDay.push(alertsCount);

      const activeBraceletsCount = this.bracelets.filter(bracelet => {
        const lastActive = new Date(bracelet.status || (bracelet.status === 'active' ? date : '1970-01-01'));
        return lastActive >= date && bracelet.status === 'active';
      }).length;
      activeBraceletsPerDay.push(activeBraceletsCount);

      const inactiveBraceletsCount = this.bracelets.filter(bracelet => {
        const lastActive = new Date(bracelet.status || (bracelet.status === 'active' ? date : '1970-01-01'));
        return lastActive >= date && bracelet.status === 'inactive';
      }).length;
      const totalBracelets = activeBraceletsCount + inactiveBraceletsCount;
      const successRate = totalBracelets > 0 ? (activeBraceletsCount / totalBracelets) * 100 : 0;
      successRatePerDay.push(Math.round(successRate));
    }

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = alertsPerDay;
    this.lineChartData.datasets[1].data = activeBraceletsPerDay;
    this.lineChartData.datasets[2].data = successRatePerDay;
    this.lineChartData = { ...this.lineChartData };
  }

  calculateAverageSuccessRate(): number {
    if (!this.bracelets.length) return 88;
    const activeCount = this.bracelets.filter(b => b.status === 'active').length;
    const totalCount = this.bracelets.length;
    return totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 88;
  }

  addUser(): void {
    console.log('Add new user');
  }

  editUser(userId: string): void {
    console.log('Edit user:', userId);
  }

  deleteUser(userId: string): void {
    console.log('Delete user:', userId);
  }
}
