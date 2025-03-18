import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Bracelet } from '../../shared/models/bracelet.model';
import { ApiResponse } from '../../shared/models/api-response.model';
import { PagedResponse } from '../../shared/models/paged-response.model';

@Injectable({
  providedIn: 'root',
})
export class BraceletService {
  private apiUrl = 'http://localhost:8080/api';

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

  getAllBracelets(page: number = 0, size: number = 10): Observable<ApiResponse<PagedResponse<Bracelet>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http
      .get<ApiResponse<PagedResponse<Bracelet>>>(`${this.apiUrl}/admin/bracelets`, {
        headers: this.getAuthHeaders(),
        params: params,
      })
      .pipe(
        catchError(error => {
          console.error('Error fetching all bracelets:', error);
          return throwError(() => new Error('Failed to load all bracelets: ' + error.message));
        })
      );
  }

  getAssignedBracelets(): Observable<Bracelet[]> {
    return this.http
      .get<Bracelet[]>(`${this.apiUrl}/public/bracelets/me`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching assigned bracelets:', error);
          return throwError(() => new Error('Failed to load assigned bracelets: ' + error.message));
        })
      );
  }

  activateBracelet(braceletId: number): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/admin/bracelets/${braceletId}/activate`, null, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error activating bracelet:', error);
          return throwError(() => new Error('Failed to activate bracelet: ' + error.message));
        })
      );
  }

  deactivateBracelet(braceletId: number): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/admin/bracelets/${braceletId}/deactivate`, null, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error deactivating bracelet:', error);
          return throwError(() => new Error('Failed to deactivate bracelet: ' + error.message));
        })
      );
  }
}
