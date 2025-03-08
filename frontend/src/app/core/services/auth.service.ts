import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User, AuthResponse } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/public';
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem(this.roleKey));

  constructor(private http: HttpClient) {}

  // Observable pour le rôle
  getRole$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  // Méthode de login
  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.roleKey, response.role || 'caregiver');
            this.roleSubject.next(response.role || 'caregiver'); // Mettre à jour le rôle
          }
        })
    );
  }

  // Méthode de logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.roleSubject.next(null); // Réinitialiser le rôle
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Récupérer le rôle (pour compatibilité)
  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
