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

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() }).pipe(
  //     catchError(error => {
  //       console.error('Error fetching users:', error);
  //       return throwError(() => new Error('Failed to load users: ' + error.message));
  //     })
  //   );
  // }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role?.roleName || 'N/A',
        address: user.address || 'N/A',
        phoneNumber: user.phoneNumber || 'N/A'
      }))),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to load users: ' + error.message));
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Failed to delete user: ' + error.message));
      })
    );
  }
}
