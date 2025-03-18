import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Bracelet} from '../../shared/models/bracelet.model';
import {AuthService} from './auth.service';
import {ApiResponse} from '../../shared/models/api-response.model';
import {catchError, map} from 'rxjs/operators';

export interface AdminStats {
  activeBracelets: number;
  inactiveBracelets: number;
  pendingAlerts: number;
  totalClients: number;
}


export interface Alert {
  braceletId: string;
  time: string;
  status: 'resolved' | 'pending';
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getStats(): Observable<AdminStats> {
    return this.http
      .get<ApiResponse<AdminStats>>(`${this.apiUrl}/stats`, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching stats:', error);
          return throwError(() => new Error('Failed to load stats'));
        })
      );
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
    // return of([
    //   { id: 'BR-001', status: 'active', batteryLevel: 90, assignedUser: 'John Doe' },
    //   { id: 'BR-002', status: 'inactive', batteryLevel: 30, assignedUser: 'Jane Smith' },
    // ]);
    return this.http.get<Bracelet[]>(`${this.apiUrl}/bracelets`);
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
