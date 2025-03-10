import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserResponse } from '../../shared/models/user.model';
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

  addUser(user: Omit<User, 'id'>): Observable<UserResponse> {
    return this.http.post<{ id: string; username: string; email: string; role: { roleName: string }; address: string; phoneNumber: string }>(
      `${this.apiUrl}`,
      { username: user.username, email: user.email, role: { roleName: user.role }, address: user.address, phoneNumber: user.phoneNumber, password: user.password },
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => ({
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role?.roleName || 'N/A',
        address: response.address || 'N/A',
        phoneNumber: response.phoneNumber || 'N/A'
      })),
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(() => new Error('Failed to add user: ' + error.message));
      })
    );
  }

  updateUser(user: User): Observable<UserResponse> {
    return this.http.put<{ id: string; username: string; email: string; role: { roleName: string }; address: string; phoneNumber: string }>(
      `${this.apiUrl}/${user.id}`,
      { username: user.username, email: user.email, role: { roleName: user.role }, address: user.address, phoneNumber: user.phoneNumber, password: user.password },
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => ({
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role?.roleName || 'N/A',
        address: response.address || 'N/A',
        phoneNumber: response.phoneNumber || 'N/A'
      })),
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Failed to update user: ' + error.message));
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
