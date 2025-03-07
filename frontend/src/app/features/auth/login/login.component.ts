import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  serverError: string = '';
  isLoading = false;
  showPassword = false;
  image = "logo_homepage.png";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.serverError = '';

      const loginData = this.loginForm.value;
      this.http.post<{ token: string }>('http://localhost:8080/api/public/login', loginData)
        .subscribe({
          next: (response) => {
            console.log('Connexion réussie ✅', response);
            localStorage.setItem('authToken', response.token);
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erreur lors de la connexion:', error);
            this.isLoading = false;
            if (error.status === 401) {
              this.serverError = 'Email ou mot de passe incorrect.';
            } else {
              this.serverError = 'Une erreur est survenue. Veuillez réessayer plus tard.';
            }
          }
        });
    }
  }
}
