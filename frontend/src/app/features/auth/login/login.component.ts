import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginPopupOpen = false; // Contrôle de la popup

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  openPopup() {
    this.isLoginPopupOpen = true;
  }

  closeLoginPopup() {
    this.isLoginPopupOpen = false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Connexion réussie ✅', this.loginForm.value);
      this.closeLoginPopup(); // Ferme la popup après connexion réussie
    }
  }
}
