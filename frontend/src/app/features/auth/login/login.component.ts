import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  serverError: string = '';
  isLoading = false;
  showPassword = false;
  image = 'logo_homepage.png';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.serverError = '';

      const user = this.loginForm.value;
      this.authService.login(user).subscribe({
        next: () => {
          this.isLoading = false;
          // Redirection en fonction du rôle
          const role = this.authService.getUserRole();
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'ROLE_USER') {
            this.router.navigate(['/dashboard']);
          } else {
            // Par défaut, rediriger vers le dashboard utilisateur
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
