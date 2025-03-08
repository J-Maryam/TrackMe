import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Bracelet {
  id: string;
  status: 'active' | 'inactive';
  batteryLevel: number;
  assignedUser?: string;
}

export interface Alert {
  braceletId: string;
  time: string;
  status: 'resolved' | 'pending';
}

export interface AdminStats {
  activeBracelets: number;
  pendingAlerts: number;
  averageBattery: number;
  totalUsers: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  // Récupérer les statistiques globales
  getStats(): Observable<AdminStats> {
    // Remplacer par une vraie requête HTTP
    return of({
      activeBracelets: 7,
      pendingAlerts: 4,
      averageBattery: 82,
      totalUsers: 15,
    });
    // return this.http.get<AdminStats>(`${this.apiUrl}/stats`);
  }

  // Récupérer l'historique des alertes
  getAlertHistory(): Observable<Alert[]> {
    // Remplacer par une vraie requête HTTP
    return of([
      { braceletId: 'BR-001', time: '10:30 AM', status: 'resolved' },
      { braceletId: 'BR-002', time: '09:15 AM', status: 'pending' },
      { braceletId: 'BR-001', time: '10:30 AM', status: 'resolved' },
      { braceletId: 'BR-002', time: '09:15 AM', status: 'pending' },
    ]);
    // return this.http.get<Alert[]>(`${this.apiUrl}/alerts/history`);
  }

  // Récupérer la liste des bracelets
  getBracelets(): Observable<Bracelet[]> {
    // Remplacer par une vraie requête HTTP
    return of([
      { id: 'BR-001', status: 'active', batteryLevel: 90, assignedUser: 'John Doe' },
      { id: 'BR-002', status: 'inactive', batteryLevel: 30, assignedUser: 'Jane Smith' },
    ]);
    // return this.http.get<Bracelet[]>(`${this.apiUrl}/bracelets`);
  }

  // Récupérer la liste des utilisateurs
  getUsers(): Observable<{ id: string; name: string; role: string }[]> {
    // Remplacer par une vraie requête HTTP
    return of([
      { id: '1', name: 'John Doe', role: 'ROLE_USER' },
      { id: '2', name: 'Jane Smith', role: 'ROLE_USER' },
    ]);
    // return this.http.get<{ id: string; name: string; role: string }[]>(`${this.apiUrl}/users`);
  }
}
