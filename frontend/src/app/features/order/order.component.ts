import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    NgIf,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  currentStep = 1;
  orderForm: FormGroup;

  steps = [
    { index: 1, title: 'Inscription' },
    { index: 2, title: 'Choisir le bracelet' },
    { index: 3, title: 'Infos patient' },
    { index: 4, title: 'Paiement' }
  ];

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/)]],
      bracelet: ['', Validators.required],
      patientName: ['', Validators.required],
      patientAge: ['', [Validators.required, Validators.min(0)]],
      patientCondition: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      paymentAmount: [{ value: '', disabled: true }, Validators.required],
    });

  }

  nextStep() {
    if (this.orderForm.valid && this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.orderForm.valid) {
      console.log('Commande envoyée', this.orderForm.value);
    }
  }
}
