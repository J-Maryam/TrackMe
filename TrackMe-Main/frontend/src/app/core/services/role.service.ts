import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from '../../shared/models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private rolesUrl = 'http://localhost:8080/api/admin/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.rolesUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching roles:', error);
        return throwError(() => new Error('Failed to load roles: ' + error.message));
      })
    );
  }
}
