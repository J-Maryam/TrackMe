import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';
import {User, UserResponse} from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessages: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+212\d{9}$/)]],
      address: ['', Validators.required],
    });

    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    const localUser = this.authService.getCurrentUser();

    if (localUser) {
      this.updateFormWithUserData(this.mapUserToUserResponse(localUser));
      this.isLoading = false;
    } else {
      this.profileService.getCurrentUser().subscribe({
        next: (user: UserResponse) => {
          this.updateFormWithUserData(user);
          this.authService['userSubject'].next(this.mapUserResponseToUser(user));
          localStorage.setItem('currentUser', JSON.stringify(this.mapUserResponseToUser(user)));
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessages['general'] = err.message || 'Erreur lors du chargement du profil.';
        },
      });
    }
  }

  updateProfile(): void {
    this.errorMessages = {};
    this.successMessage = null;

    if (this.profileForm.valid) {
      const profileData: Partial<UserResponse> = {
        phoneNumber: this.profileForm.get('phoneNumber')?.value,
        address: this.profileForm.get('address')?.value,
      };
      this.isLoading = true;
      this.profileService.updateProfile(profileData).subscribe({
        next: (response: { user: UserResponse }) => {
          this.updateFormWithUserData(response.user);
          this.authService['userSubject'].next(this.mapUserResponseToUser(response.user));
          localStorage.setItem('currentUser', JSON.stringify(this.mapUserResponseToUser(response.user)));
          this.isLoading = false;
          this.successMessage = 'Profil mis à jour avec succès !';
        },
        error: (err) => {
          this.isLoading = false;
          this.handleBackendError(err);
        },
      });
    } else {
      this.markFormGroupTouched(this.profileForm);
      this.setProfileValidationErrors();
    }
  }

  changePassword(): void {
    this.errorMessages = {};
    this.successMessage = null;

    if (this.passwordForm.valid && !this.passwordForm.errors?.['mismatch']) {
      const passwordData = {
        oldPassword: this.passwordForm.get('oldPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value,
      };
      this.isLoading = true;
      this.profileService.changePassword(passwordData).subscribe({
        next: (response: { message?: string }) => {
          this.isLoading = false;
          this.successMessage = response.message || 'Mot de passe changé avec succès !';
          this.passwordForm.reset();
        },
        error: (err) => {
          this.isLoading = false;
          this.handleBackendError(err);
        },
      });
    } else {
      this.markFormGroupTouched(this.passwordForm);
      this.setPasswordValidationErrors();
    }
  }

  validateOldPassword(oldPassword: string | null | undefined): void {
    if (!oldPassword) {
      this.errorMessages['oldPassword'] = 'L’ancien mot de passe est requis.';
      return;
    }
    this.profileService.validateOldPassword(oldPassword).subscribe({
      next: (response) => {
        if (response.valid) {
          delete this.errorMessages['oldPassword'];
        }
      },
      error: (err) => {
        const errors = err.error?.errors || {};
        if (errors['oldPassword']) {
          this.errorMessages['oldPassword'] = errors['oldPassword'];
        } else {
          delete this.errorMessages['oldPassword'];
        }
      },
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  private updateFormWithUserData(user: UserResponse): void {
    this.profileForm.patchValue({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  private setProfileValidationErrors() {
    this.errorMessages = {};
    const phoneNumber = this.profileForm.get('phoneNumber');
    const address = this.profileForm.get('address');

    if (phoneNumber?.errors?.['required']) {
      this.errorMessages['phoneNumber'] = 'Le numéro de téléphone est requis.';
    } else if (phoneNumber?.errors?.['pattern']) {
      this.errorMessages['phoneNumber'] = 'Le numéro doit être au format +212XXXXXXXXX.';
    }
    if (address?.errors?.['required']) {
      this.errorMessages['address'] = 'L’adresse est requise.';
    }
  }

  private setPasswordValidationErrors() {
    this.errorMessages = {};
    const oldPassword = this.passwordForm.get('oldPassword');
    const newPassword = this.passwordForm.get('newPassword');
    const confirmPassword = this.passwordForm.get('confirmPassword');

    if (oldPassword?.errors?.['required']) {
      this.errorMessages['oldPassword'] = 'L’ancien mot de passe est requis.';
    }
    if (newPassword?.errors?.['required']) {
      this.errorMessages['newPassword'] = 'Le nouveau mot de passe est requis.';
    } else if (newPassword?.errors?.['minlength']) {
      this.errorMessages['newPassword'] = 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    if (confirmPassword?.errors?.['required']) {
      this.errorMessages['confirmPassword'] = 'La confirmation du mot de passe est requise.';
    }
    if (this.passwordForm.errors?.['mismatch']) {
      this.errorMessages['confirmPassword'] = 'Les mots de passe ne correspondent pas.';
    }
  }

  private handleBackendError(err: any) {
    const errorResponse = err.error || {};
    const errors = errorResponse.errors || {};
    const generalMessage = errorResponse.message || err.message || 'Une erreur est survenue.';

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(key => {
        this.errorMessages[key] = errors[key];
      });
    } else {
      this.errorMessages['general'] = generalMessage;
    }
  }

  private mapUserToUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      address: user.address,
      phoneNumber: user.phoneNumber,
      enabled: user.enabled ?? true,
    };
  }

  private mapUserResponseToUser(userResponse: UserResponse): User {
    return {
      id: userResponse.id,
      username: userResponse.username,
      email: userResponse.email,
      role: userResponse.role,
      address: userResponse.address,
      phoneNumber: userResponse.phoneNumber,
      enabled: userResponse.enabled,
    };
  }
}
