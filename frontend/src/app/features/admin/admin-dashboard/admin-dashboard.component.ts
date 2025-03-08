import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AdminService, AdminStats, Alert, Bracelet } from '../../../core/services/admin.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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

  // Configuration du graphique
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
    plugins: {
      legend: { display: true },
    },
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Récupérer les statistiques
    this.adminService.getStats().subscribe((stats) => {
      this.stats = stats;
    });

    // Récupérer l'historique des alertes
    this.adminService.getAlertHistory().subscribe((alerts) => {
      this.alerts = alerts;
    });

    // Récupérer la liste des bracelets
    this.adminService.getBracelets().subscribe((bracelets) => {
      this.bracelets = bracelets;
    });

    // Récupérer la liste des utilisateurs
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
    // Rediriger ou ouvrir un modal pour modifier l'utilisateur
  }

  deleteUser(userId: string): void {
    console.log('Delete user:', userId);
    // Appeler une API pour supprimer l'utilisateur
  }
}
