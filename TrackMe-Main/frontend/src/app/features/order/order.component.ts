import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { pastDateValidator } from '../../validators/pastDateValidator';

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
  errorMessage: string = ''; // Conservé pour la logique interne, mais plus affiché dans l'UI

  steps = [
    { index: 1, title: 'Inscription' },
    { index: 2, title: 'Infos patient' },
    { index: 3, title: 'Choisir le bracelet' },
    { index: 4, title: 'Paiement' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.orderForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.loadSavedData();
    this.subscribeToDateOfBirthChanges();
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [this.emailUniqueValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+212\d{9}$/)]],  //Validators.pattern(/^\+\d{2,3}\s?\d{3}\s?\d{3}\s?\d{3}$/,
      patientName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, pastDateValidator()]],
      patientAge: [''],
      braceletColor: ['', Validators.required],
      patientId: [''],
      paymentAmount: [{ value: '50.00', disabled: true }, Validators.required],
      transactionId: ['']
    });
  }

  private loadSavedData(): void {
    const savedData = this.getOrderData();
    if (savedData) {
      this.orderForm.patchValue(savedData);
      this.calculateAge();
    }
  }

  private subscribeToDateOfBirthChanges(): void {
    this.orderForm.get('dateOfBirth')?.valueChanges.subscribe(() => this.calculateAge());
  }

  nextStep(): void {
    const controls = this.getControlsForStep();
    this.markControlsAsTouched(controls);

    if (this.isStepValid(controls) && this.currentStep < this.steps.length) {
      if (this.currentStep === 2) {
        this.generatePatientId();
      }
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

  async onSubmit(transactionId: string | null): Promise<void> {
    if (!transactionId) {
      console.error('Paiement non confirmé (transactionId manquant):', this.orderForm.getRawValue());
      this.errorMessage = 'Paiement non confirmé (transactionId manquant)';
      return;
    }

    const rawValue = this.orderForm.getRawValue();
    console.log('Début de onSubmit, données envoyées:', rawValue);

    this.errorMessage = '';
    try {
      const response = await this.http.post<any>('http://localhost:8080/api/public/orders/complete', rawValue).toPromise();if (response && response.text === 'Commande insérée avec succès') {
        this.showSuccessAlert();
      } else {
        throw new Error('Réponse inattendue du serveur');
      }
    } catch (error) {
      console.error('Erreur lors de l\'insertion:', error);
      let errorDetail = 'Erreur lors de l\'insertion dans la base de données';
      if (error instanceof HttpErrorResponse) {
        errorDetail += ` (Statut: ${error.status}, Message: ${JSON.stringify(error.error)})`;
        if (error.status === 404) {
          errorDetail += ' Vérifiez que le transactionId est correct et que le paiement a été enregistré.';
        }
      } else if (error instanceof Error) {
        errorDetail += ` (Message: ${error.message})`;
      }
      console.error(errorDetail); // Loguer l'erreur dans la console pour le débogage
      // Ne plus assigner errorDetail à errorMessage pour éviter l'affichage dans l'UI
      this.errorMessage = ''; // Optionnel : garder vide pour ne rien afficher
    }
  }

  private showSuccessAlert(): void {
    this.errorMessage = ''; // Effacer tout message d'erreur
    Swal.fire({
      title: 'Commande réussie !',
      text: 'Votre commande a été insérée avec succès. Le bracelet sera livré dans les 5 prochains jours.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#E67E22',
      // timer: 5000,
      timerProgressBar: true,
      didClose: () => {
        this.router.navigate(['/login']);
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('orderData', JSON.stringify(this.orderForm.getRawValue()));
  }

  private getOrderData(): any {
    return JSON.parse(localStorage.getItem('orderData') || '{}');
  }

  private getControlsForStep(): string[] {
    const stepControls = {
      1: ['username', 'email', 'password', 'address', 'phoneNumber'],
      2: ['patientName', 'dateOfBirth'],
      3: ['braceletColor'],
      4: ['paymentAmount']
    };
    return stepControls[this.currentStep as keyof typeof stepControls] || [];
  }

  private markControlsAsTouched(controls: string[]): void {
    controls.forEach(control => this.orderForm.get(control)?.markAsTouched());
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
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.orderForm.get('patientAge')?.setValue(age);
    } else {
      this.orderForm.get('patientAge')?.setValue('');
    }
  }

  private generatePatientId(): void {
    const patientName = this.orderForm.get('patientName')?.value;
    const dateOfBirth = this.orderForm.get('dateOfBirth')?.value;
    if (patientName && dateOfBirth) {
      const patientId = `${patientName.toLowerCase().replace(/\s/g, '-')}-${new Date(dateOfBirth).getTime()}`;
      this.orderForm.patchValue({ patientId });
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
