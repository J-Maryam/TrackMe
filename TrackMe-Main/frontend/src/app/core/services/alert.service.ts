import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Alert} from '../../shared/models/alert.model';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl = 'http://localhost:8080/api/alerts';

  constructor(private http: HttpClient) {}

  getAllAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.apiUrl);
  }

  getAlertsByStatus(status: string): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/status/${status}`);
  }

  getAlertsByType(type: string): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/type/${type}`);
  }

  getAlertsByBraceletId(braceletId: number): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/bracelet/${braceletId}`);
  }
}
