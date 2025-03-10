import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, tap, throwError} from 'rxjs';
import { User, AuthResponse } from '../../shared/models/user.model';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/public';
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem(this.roleKey));

  constructor(private http: HttpClient) {}

  getRole$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  login(user: Pick<User, 'email' | 'password'>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            if (!response.role) {
              throw new Error('Role not provided in the login response.');
            }
            localStorage.setItem(this.roleKey, response.role);
            this.roleSubject.next(response.role);
          }
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => new Error('Login failed. Please check your credentials.'));
        })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.roleSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }
}
