import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {UserService} from '../../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [SidebarComponent, RouterLink, NgFor, NgIf, NgClass, TitleCasePipe, ReactiveFormsModule],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditing: boolean = false;
  selectedUserId: string | null = null;
  errorMessage: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5; // Nombre d'éléments par page

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['ROLE_USER', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users.';
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
          error: () => {
            this.errorMessage = 'Failed to update user.';
          },
        });
      } else {
        this.userService.addUser(userData).subscribe({
          next: () => {
            this.loadUsers();
            this.resetForm();
            this.errorMessage = null;
          },
          error: () => {
            this.errorMessage = 'Failed to add user.';
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
        name: user.name,
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
        error: () => {
          this.errorMessage = 'Failed to delete user.';
        },
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedUserId = null;
    this.userForm.reset({
      name: '',
      email: '',
      role: 'ROLE_USER',
    });
  }

  // Méthodes pour la pagination
  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.users.length) {
      this.currentPage++;
    }
  }
}
