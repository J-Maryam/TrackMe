import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import {pastDateValidator} from '../../../validators/pastDateValidator';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  @Input() orderForm: FormGroup | undefined;

  form!: FormGroup; // Utilisation de l'opérateur de définition certaine

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required, pastDateValidator()]], // Ajout du validateur personnalisé
      age: [{ value: '', disabled: true }] // Champ désactivé car calculé automatiquement
    });

    // Calculer l'âge si une date de naissance est déjà présente
    this.calculateAge();
  }

  // Méthode pour calculer l'âge
  calculateAge(): void {
    const dateOfBirth = this.form.get('dateOfBirth')?.value;
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.form.get('age')?.setValue(age); // Mise à jour de l'âge
    } else {
      this.form.get('age')?.setValue(''); // Réinitialiser l'âge si la date de naissance est vide
    }
  }

  selectedBracelet: string | null = null;

  selectBracelet(bracelet: string) {
    this.selectedBracelet = bracelet;

    if (this.orderForm) {
      this.orderForm.patchValue({ bracelet });
    }
  }
}
