import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bracelet } from '../../shared/models/bracelet.model';
import { ApiResponse } from '../../shared/models/api-response.model';
import { PagedResponse } from '../../shared/models/paged-response.model';

@Injectable({
  providedIn: 'root',
})
export class BraceletService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAssignedBracelets(): Observable<Bracelet[]> {
    return this.http.get<Bracelet[]>(`${this.apiUrl}/public/bracelets/me`).pipe(
      catchError(error => {
        console.error('Error fetching assigned bracelets:', error);
        return throwError(() => new Error('Failed to load assigned bracelets: ' + error.message));
      })
    );
  }

  getAllBracelets(page: number = 0, size: number = 10): Observable<ApiResponse<PagedResponse<Bracelet>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<PagedResponse<Bracelet>>>(`${this.apiUrl}/admin/bracelets`, { params }).pipe(
      catchError(error => {
        console.error('Error fetching all bracelets:', error);
        return throwError(() => new Error('Failed to load all bracelets: ' + error.message));
      })
    );
  }

  activateBracelet(braceletId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/bracelets/${braceletId}/activate`, null).pipe(
      catchError(error => {
        console.error('Error activating bracelet:', error);
        return throwError(() => new Error('Failed to activate bracelet: ' + error.message));
      })
    );
  }

  deactivateBracelet(braceletId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/bracelets/${braceletId}/deactivate`, null).pipe(
      catchError(error => {
        console.error('Error deactivating bracelet:', error);
        return throwError(() => new Error('Failed to deactivate bracelet: ' + error.message));
      })
    );
  }
}
