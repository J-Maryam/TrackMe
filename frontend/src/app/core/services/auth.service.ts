import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string | null = null; // Rôle de l'utilisateur (stocké après connexion)

  // Simuler la récupération du rôle (à remplacer par une vraie logique, ex. : JWT)
  getUserRole(): string | null {
    return localStorage.getItem('userRole') || 'caregiver'; // Exemple : 'admin' ou 'caregiver'
  }

  logout(): void {
    localStorage.removeItem('userRole');
    // Autres logiques de déconnexion (ex. : supprimer token)
  }
}
