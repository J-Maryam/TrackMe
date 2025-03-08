import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Vérifier le rôle pour des routes spécifiques
    const role = this.authService.getUserRole();
    const url = state.url;

    // Si l'utilisateur essaie d'accéder à /admin-dashboard
    if (url === '/admin-dashboard' && role !== 'ROLE_ADMIN') {
      // Rediriger vers /dashboard si ce n'est pas un admin
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Si l'utilisateur essaie d'accéder à /dashboard
    if (url === '/dashboard' && role === 'ROLE_ADMIN') {
      // Rediriger vers /admin-dashboard si c'est un admin
      this.router.navigate(['/admin-dashboard']);
      return false;
    }

    return true;
  }
}
