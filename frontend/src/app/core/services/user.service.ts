import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponse } from '../../shared/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token found. Please login first.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role?.roleName || 'N/A',
        address: user.address || 'N/A',
        phoneNumber: user.phoneNumber || 'N/A',
        enabled: user.enabled !== undefined ? user.enabled : false
      }))),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to load users: ' + error.message));
      })
    );
  }

  disableUser(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}/disable`;
    return this.http.put<void>(url, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error disabling user:', error);
        return throwError(() => new Error('Failed to disable user: ' + error.message));
      })
    );
  }

  enableUser(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}/enable`;
    return this.http.put<void>(url, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error enabling user:', error);
        return throwError(() => new Error('Failed to enable user: ' + error.message));
      })
    );
  }
}
