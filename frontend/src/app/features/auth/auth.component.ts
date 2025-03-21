import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  authForm: FormGroup;
  serverError: string = '';
  isLoading = false;
  showPassword = false;
  isRegisterMode = false;
  image = 'logo_homepage.png';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.serverError = '';
    if (this.isRegisterMode) {
      this.authForm.addControl('name', this.fb.control('', Validators.required));
      this.authForm.addControl('address', this.fb.control('', Validators.required));
      this.authForm.addControl('phoneNumber', this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')])); // Exemple : 10 chiffres
    } else {
      this.authForm.removeControl('name');
      this.authForm.removeControl('address');
      this.authForm.removeControl('phoneNumber');
    }
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      this.isLoading = true;
      this.serverError = '';

      if (this.isRegisterMode) {
        const { name, email, password, address, phoneNumber } = this.authForm.value;
          this.authService.register({ name, email, password, address, phoneNumber }).subscribe({
          next: () => {
            this.isLoading = false;
            this.isRegisterMode = false;
            this.authForm.removeControl('name');
            this.authForm.removeControl('address');
            this.authForm.removeControl('phoneNumber');
            this.authForm.reset();
          },
          error: (error) => {
            this.isLoading = false;
            if (error.status === 400) {
              this.serverError = 'Cet email est déjà utilisé.';
            } else {
              this.serverError = 'Une erreur est survenue. Veuillez réessayer.';
            }
          },
        });
      } else {
        const { email, password } = this.authForm.value;
        this.authService.login({ email, password }).subscribe({
          next: () => {
            this.isLoading = false;
            const role = this.authService.getUserRole();
            if (role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin-dashboard']);
            } else if (role === 'ROLE_USER') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
          error: (error) => {
            this.isLoading = false;
            if (error.status === 401) {
              this.serverError = 'Email ou mot de passe incorrect.';
            } else {
              this.serverError = 'Une erreur est survenue. Veuillez réessayer.';
            }
          },
        });
      }
    }
  }
}
