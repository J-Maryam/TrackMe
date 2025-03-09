import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/admin/users';
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'ROLE_USER', address: '123 Main St', telephone: '+1-555-123-4567' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'ROLE_USER', address: '456 Oak Ave', telephone: '+1-555-987-6543' },
    { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'ROLE_ADMIN', address: '789 Pine Rd', telephone: '+1-555-456-7890' },
  ];

  constructor(private http: HttpClient) {}

  // Récupérer la liste des utilisateurs
  getUsers(): Observable<User[]> {
    return of(this.users);
    // return this.http.get<User[]>(`${this.apiUrl}`);
  }

  // Ajouter un nouvel utilisateur
  addUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...user,
    };
    this.users.push(newUser);
    return of(newUser);
    // return this.http.post<User>(`${this.apiUrl}`, user);
  }

  // Mettre à jour un utilisateur
  updateUser(user: User): Observable<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return of(user);
    // return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<void> {
    this.users = this.users.filter(u => u.id !== id);
    return of(undefined);
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
