import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { UserResponse } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

interface StatusFilter {
  key: 'all' | 'active' | 'inactive';
  label: string;
  classes: (currentFilter: string) => any;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [SidebarComponent, NgFor, NgIf, NgClass, TitleCasePipe],
})
export class UserManagementComponent implements OnInit {
  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  errorMessage: string | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  isLoading = false;
  filterStatus: 'all' | 'active' | 'inactive' = 'all';

  columns = ['Name', 'Email', 'Address', 'Phone Number', 'Role', 'Status', 'Actions'];

  statusFilters: StatusFilter[] = [
    { key: 'all', label: 'All Users', classes: (current) => ({ 'bg-[#F4A261] text-white': current === 'all', 'bg-gray-200 text-[#4A6572]': current !== 'all' }) },
    { key: 'active', label: 'Active Users', classes: (current) => ({ 'bg-green-500 text-white': current === 'active', 'bg-gray-200 text-[#4A6572]': current !== 'active' }) },
    { key: 'inactive', label: 'Inactive Users', classes: (current) => ({ 'bg-red-500 text-white': current === 'inactive', 'bg-gray-200 text-[#4A6572]': current !== 'inactive' }) }
  ];

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

  /** Load users from the API */
  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter(user => user.role === 'ROLE_CLIENT');
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError(err);
      },
    });
  }

  /** Apply status filter to the user list */
  applyFilter(): void {
    this.filteredUsers = this.filterStatus === 'all'
      ? [...this.users]
      : this.users.filter(user => this.filterStatus === 'active' ? user.enabled : !user.enabled);
    this.currentPage = 1;
  }

  /** Toggle user status (activate/deactivate) */
  toggleUserStatus(id: string, enabled: boolean): void {
    const action = enabled ? 'deactivate' : 'activate';
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    this.isLoading = true;
    const observable = enabled ? this.userService.disableUser(id) : this.userService.enableUser(id);
    observable.subscribe({
      next: () => {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
          this.users[userIndex].enabled = !enabled;
          this.applyFilter();
        }
        this.isLoading = false;
        this.errorMessage = `User ${action}d successfully.`;
        setTimeout(() => this.errorMessage = null, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = `Failed to ${action} user. Please try again.`;
        console.error(`Error toggling user status:`, err);
      },
    });
  }

  /** Get paginated users for the current page */
  get paginatedUsers(): UserResponse[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  /** Get total number of pages */
  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage) || 1;
  }

  /** Navigate to the previous page */
  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  /** Navigate to the next page */
  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  /** Handle API errors */
  private handleError(err: any): void {
    if (err.status === 401) {
      this.errorMessage = 'Your session has expired. Please log in again.';
      this.authService.logout();
      this.router.navigate(['/login']);
    } else if (err.status === 403) {
      this.errorMessage = 'You do not have permission to view this page.';
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Unable to load users. Please try again later.';
    }
    console.error('Error loading users:', err);
  }
}
