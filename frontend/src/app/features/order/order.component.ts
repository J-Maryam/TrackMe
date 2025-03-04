import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import {pastDateValidator} from '../../validators/pastDateValidator';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgForOf,
    NgClass,
    NgIf,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component
  ],
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentStep = 1;
  orderForm: FormGroup;

  steps = [
    { index: 1, title: 'Inscription' },
    { index: 2, title: 'Infos patient' },
    { index: 3, title: 'Choisir le bracelet' },
    { index: 4, title: 'Paiement' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.orderForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [this.emailUniqueValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+\d{2,3}\s?\d{3}\s?\d{3}\s?\d{3}$/)]],
      patientName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, pastDateValidator()]],
      patientAge: [''],
      braceletColor: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      paymentAmount: [{ value: '50.00', disabled: true }, Validators.required],
      transactionId: [''],
    });

    this.orderForm.get('dateOfBirth')?.valueChanges.subscribe(() => this.calculateAge());
  }

  ngOnInit(): void {
    const savedData = this.getOrderData();
    if (savedData) {
      this.orderForm.patchValue(savedData);
      this.calculateAge();
    }
  }

  nextStep(): void {
    const controlsForStep = this.getControlsForStep(this.currentStep);
    controlsForStep.forEach(control => this.orderForm.get(control)?.markAsTouched());

    if (this.isStepValid(controlsForStep) && this.currentStep < this.steps.length) {
      this.saveToLocalStorage();
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.saveToLocalStorage();
      this.currentStep--;
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Commande soumise :', this.orderForm.value);
      localStorage.removeItem('orderData');
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('orderData', JSON.stringify(this.orderForm.value));
  }

  private getOrderData() {
    return JSON.parse(localStorage.getItem('orderData') || '{}');
  }

  private getControlsForStep(step: number): string[] {
    const stepControls: { [key: number]: string[] } = {
      1: ['username', 'email', 'password', 'address', 'phoneNumber'],
      2: ['patientName', 'dateOfBirth'],
      3: ['braceletColor'],
      4: ['paymentMethod', 'paymentAmount', 'transactionId']
    };
    return stepControls[step] || [];
  }

  private isStepValid(controls: string[]): boolean {
    return controls.every(control => {
      const field = this.orderForm.get(control);
      return field?.valid && !field?.pending;
    });
  }

  private calculateAge(): void {
    const dateOfBirth = this.orderForm.get('dateOfBirth')?.value;
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.orderForm.get('patientAge')?.setValue(age);
    } else {
      this.orderForm.get('patientAge')?.setValue('');
    }
  }

  private emailUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      if (!email) return of(null);

      return this.http.get<boolean>(`http://localhost:8080/api/public/users/check-email?email=${email}`).pipe(
        debounceTime(300),
        map(exists => exists ? { emailTaken: true } : null),
        catchError(() => of({ emailCheckFailed: true }))
      );
    };
  }
}
