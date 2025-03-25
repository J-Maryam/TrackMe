import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

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
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminStats> {
    return this.http.get<{ data: AdminStats }>(`${this.apiUrl}/stats`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching stats:', error);
          return throwError(() => new Error('Failed to load stats'));
        })
      );
  }

  getAlertHistory(): Observable<Alert[]> {
    return of([
      { braceletId: 'BR-001', time: '10:30 AM', status: 'resolved' },
      { braceletId: 'BR-002', time: '09:15 AM', status: 'pending' },
      { braceletId: 'BR-001', time: '10:30 AM', status: 'resolved' },
      { braceletId: 'BR-002', time: '09:15 AM', status: 'pending' },
    ]);
    // Uncomment when ready to use the real API:
    // return this.http.get<Alert[]>(`${this.apiUrl}/alerts/history`);
  }
}
