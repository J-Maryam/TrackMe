import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit {

  @ViewChild('trackingChart') trackingChart!: ElementRef;
  @ViewChild('activityChart') activityChart!: ElementRef;

  ngAfterViewInit() {
    this.initTrackingChart();
    this.initActivityChart();
  }

  initTrackingChart() {
    new Chart(this.trackingChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Activité Utilisateurs',
          data: [120, 180, 150, 210, 240, 300, 320],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderWidth: 2
        }]
      }
    });
  }

  initActivityChart() {
    new Chart(this.activityChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Connectés', 'Déconnectés', 'En Transit'],
        datasets: [{
          data: [70, 20, 10],
          backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12']
        }]
      }
    });
  }
}
