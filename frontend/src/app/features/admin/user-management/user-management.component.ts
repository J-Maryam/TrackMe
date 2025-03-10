import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { User, UserResponse } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { RoleService } from '../../../core/services/role.service';
import {Role} from '../../../shared/models/role.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [SidebarComponent, RouterLink, NgFor, NgIf, NgClass, TitleCasePipe, ReactiveFormsModule],
})
export class UserManagementComponent implements OnInit {
  users: UserResponse[] = [];
  roles: Role[] = [];
  userForm: FormGroup;
  isEditing: boolean = false;
  selectedUserId: string | null = null;
  errorMessage: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required], // Initialisation vide, remplie dynamiquement
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadRoles();
    this.loadUsers();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        if (roles.length > 0 && !this.userForm.get('role')?.value) {
          this.userForm.get('role')?.setValue(roles[0].roleName); // Définit le premier rôle comme valeur par défaut
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to load roles. Error: ' + err.message;
        console.error('Error loading roles:', err);
      },
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Loaded users:', this.users);
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

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: Omit<User, 'id'> = this.userForm.value;
      if (this.isEditing && this.selectedUserId) {
        this.userService.updateUser({ id: this.selectedUserId, ...userData }).subscribe({
          next: () => {
            this.loadUsers();
            this.resetForm();
            this.errorMessage = null;
          },
          error: (err) => {
            this.errorMessage = 'Failed to update user. Error: ' + err.message;
          },
        });
      } else {
        this.userService.addUser(userData).subscribe({
          next: () => {
            this.loadUsers();
            this.resetForm();
            this.errorMessage = null;
          },
          error: (err) => {
            this.errorMessage = 'Failed to add user. Error: ' + err.message;
          },
        });
      }
    }
  }

  editUser(id: string): void {
    const user = this.users.find(u => u.id === id);
    if (user) {
      this.isEditing = true;
      this.selectedUserId = id;
      this.userForm.patchValue({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
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

  resetForm(): void {
    this.isEditing = false;
    this.selectedUserId = null;
    this.userForm.reset({
      username: '',
      email: '',
      role: this.roles.length > 0 ? this.roles[0].roleName : '', // Réinitialisation avec le premier rôle disponible
    });
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
