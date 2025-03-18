import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserResponse } from '../../shared/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseApiUrl = 'http://localhost:8080/api';

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

  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseApiUrl}/current-user`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching current user:', error);
        return throwError(() => new Error('Failed to fetch current user: ' + error.message));
      })
    );
  }

  updateProfile(user: Partial<UserResponse>): Observable<{ user: UserResponse }> {
    return this.http
      .put<{ user: UserResponse }>(`${this.baseApiUrl}/profile`, user, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error updating profile:', error);
          return throwError(() => new Error('Failed to update profile: ' + error.message));
        })
      );
  }

  changePassword(passwordData: { oldPassword: string; newPassword: string }): Observable<{ message?: string }> {
    return this.http
      .post<{ message?: string }>(`${this.baseApiUrl}/updatePassword`, passwordData, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error changing password:', error);
          return throwError(() => new Error('Failed to change password: ' + error.message));
        })
      );
  }

  validateOldPassword(oldPassword: string): Observable<{ valid: boolean }> {
    return this.http
      .post<{ valid: boolean }>(`${this.baseApiUrl}/validateOldPassword`, { oldPassword }, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error validating old password:', error);
          return throwError(() => new Error('Failed to validate old password: ' + error.message));
        })
      );
  }
}
