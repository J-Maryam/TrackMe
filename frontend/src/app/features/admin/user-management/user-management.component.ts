import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { UserResponse } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [SidebarComponent, NgFor, NgIf, NgClass, TitleCasePipe],
})
export class UserManagementComponent implements OnInit {
  users: UserResponse[] = [];
  errorMessage: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter(user => user.role === 'ROLE_CLIENT');
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Session expired or invalid. Please login again.';
          this.authService.logout();
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.errorMessage = 'Access denied. You must be an admin.';
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Failed to load users. Error: ' + err.message;
        }
        console.error('Error loading users:', err);
      },
    });
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete user. Error: ' + err.message;
        },
      });
    }
  }

  get paginatedUsers(): UserResponse[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage) || 1;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
