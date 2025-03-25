import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from '../../shared/models/role.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private rolesUrl = 'http://localhost:8080/api/admin/roles';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token found. Please login first.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.rolesUrl}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching roles:', error);
        return throwError(() => new Error('Failed to load roles: ' + error.message));
      })
    );
  }
}
