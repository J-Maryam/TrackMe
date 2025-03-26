import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponse } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
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

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user by ID:', error);
        return throwError(() => new Error('Failed to load user: ' + error.message));
      })
    );
  }

  disableUser(id: number | undefined): Observable<void> {
    const url = `${this.apiUrl}/${id}/disable`;
    return this.http.put<void>(url, {}).pipe(
      catchError(error => {
        console.error('Error disabling user:', error);
        return throwError(() => new Error('Failed to disable user: ' + error.message));
      })
    );
  }

  enableUser(id: number | undefined): Observable<void> {
    const url = `${this.apiUrl}/${id}/enable`;
    return this.http.put<void>(url, {}).pipe(
      catchError(error => {
        console.error('Error enabling user:', error);
        return throwError(() => new Error('Failed to enable user: ' + error.message));
      })
    );
  }
}
