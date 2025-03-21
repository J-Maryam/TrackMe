import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, AuthResponse } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/public';
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private userKey = 'currentUser';
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem(this.roleKey));
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());

  constructor(private http: HttpClient) {}

  getRole$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  getUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  login(user: Pick<User, 'email' | 'password'>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.roleKey, response.role);

            const userData: User = {
              id: response.id,
              email: response.email,
              role: response.role,
              username: response.username,
              address: response.address || 'N/A',
              phoneNumber: response.phoneNumber || 'N/A',
              enabled: response.enabled ?? true,
            };

            localStorage.setItem(this.userKey, JSON.stringify(userData));
            this.roleSubject.next(response.role);
            this.userSubject.next(userData);
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
    localStorage.removeItem(this.userKey);
    this.roleSubject.next(null);
    this.userSubject.next(null);
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

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  register(user: { name: string; email: string; password: string; address: string; phoneNumber: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
