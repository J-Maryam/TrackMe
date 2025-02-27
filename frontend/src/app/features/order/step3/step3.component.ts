import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { pastDateValidator } from '../../../validators/pastDateValidator';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  @Input() orderForm: FormGroup | undefined;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required, pastDateValidator()]],
      age: [''], // Champ simple, readonly géré dans le HTML
    });

    // Écouter les changements sur dateOfBirth
    this.form.get('dateOfBirth')?.valueChanges.subscribe((value) => {
      console.log('Date de naissance changée :', value);
      this.calculateAge();
    });

    // Si une valeur initiale existe via orderForm, la charger
    if (this.orderForm?.get('dateOfBirth')?.value) {
      this.form.patchValue({
        dateOfBirth: this.orderForm.get('dateOfBirth')?.value
      });
      this.calculateAge(); // Calculer l'âge initial
    }
  }

  // Méthode pour calculer l'âge
  calculateAge(): void {
    const dateOfBirth = this.form.get('dateOfBirth')?.value;
    console.log('Valeur de dateOfBirth :', dateOfBirth);

    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      console.log('Âge calculé :', age);
      this.form.get('age')?.setValue(age);
    } else {
      this.form.get('age')?.setValue('');
      console.log('Aucune date, âge réinitialisé');
    }
  }
}
