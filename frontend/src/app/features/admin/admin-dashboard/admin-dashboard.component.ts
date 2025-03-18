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
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Alerts per Day',
        borderColor: '#F4A261',
        backgroundColor: 'rgba(244, 162, 97, 0.2)',
        fill: true,
      },
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: true } },
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe((stats) => {
      this.stats = stats;
      console.log(stats.totalClients, "cleint number : "+stats.totalClients+ "")
    });

    this.adminService.getAlertHistory().subscribe((alerts) => {
      this.alerts = alerts;
    });

    this.adminService.getBracelets().subscribe((bracelets) => {
      this.bracelets = bracelets;
    });

    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Placeholder pour des actions (à implémenter)
  addUser(): void {
    console.log('Add new user');
    // Rediriger ou ouvrir un modal pour ajouter un utilisateur
  }

  editUser(userId: string): void {
    console.log('Edit user:', userId);
  }

  deleteUser(userId: string): void {
    console.log('Delete user:', userId);
  }
}
