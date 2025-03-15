import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Bracelet } from '../../shared/models/bracelet.model';

@Injectable({
  providedIn: 'root',
})
export class BraceletService {
  private apiUrl = 'http://localhost:8080/api/public/bracelets';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token found. Please login first.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAssignedBracelets(): Observable<Bracelet[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('No authenticated user found. Please login.'));
    }

    return this.http
      .get<Bracelet[]>(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error fetching bracelets:', error);
          return throwError(() => new Error('Failed to load bracelets: ' + error.message));
        })
      );
  }
}
