import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ]
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean = false; // Variable pour déterminer si l'utilisateur est un admin

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Vérifier le rôle de l'utilisateur via un service d'authentification
    this.isAdmin = this.authService.getUserRole() === 'admin'; // Suppose que le service retourne 'admin' ou 'caregiver'
  }

  logout(): void {
    this.authService.logout(); // Déconnexion via le service
    this.router.navigate(['/login']); // Redirection vers la page de login
  }
}
