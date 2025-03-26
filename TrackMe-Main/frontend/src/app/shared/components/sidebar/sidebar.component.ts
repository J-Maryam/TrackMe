import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, RouterLink, NavigationEnd, RouterLinkActive} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import { Subscription } from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive, NgClass],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  isAdmin: boolean = false;
  currentRoute: string = '';
  private roleSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    this.roleSubscription = this.authService.getRole$().subscribe((role) => {
      this.isAdmin = role === 'ROLE_ADMIN';
    });
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Vérifier si un lien est actif
  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
