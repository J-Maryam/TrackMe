import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, HeaderComponent],
})
export class AuthComponent implements OnDestroy {
  authForm: FormGroup;
  serverError: string = '';
  isLoading = false;
  showPassword = false;
  isRegisterMode = false;
  image = 'logo_homepage.png';
  private subscriptions: Subscription[] = [];

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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
      this.authForm.addControl('phoneNumber', this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]));
    } else {
      this.authForm.removeControl('name');
      this.authForm.removeControl('address');
      this.authForm.removeControl('phoneNumber');
    }
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.invalid) return;

    this.isLoading = true;
    this.serverError = '';

    const authRequest = this.isRegisterMode
      ? this.authService.register(this.authForm.value)
      : this.authService.login(this.authForm.value);

    const sub = authRequest.subscribe({
      next: () => {
        this.isLoading = false;
        if (this.isRegisterMode) {
          this.toggleMode(); // Retour au mode login après inscription réussie
        } else {
          const role = this.authService.getUserRole();
          const redirectRoute = role === 'ROLE_ADMIN' ? '/admin-dashboard' : '/dashboard';
          this.router.navigate([redirectRoute]);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.serverError = this.getErrorMessage(error);
      },
    });

    this.subscriptions.push(sub);
  }

  private getErrorMessage(error: any): string {
    if (this.isRegisterMode) {
      return error.status === 400 ? 'Cet email est déjà utilisé.' : 'Une erreur est survenue. Veuillez réessayer.';
    }
    return error.status === 401 ? 'Email ou mot de passe incorrect.' : 'Une erreur est survenue. Veuillez réessayer.';
  }
}
