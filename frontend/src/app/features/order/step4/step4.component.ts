import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf, CurrencyPipe } from '@angular/common';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CurrencyPipe],
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {
  @Input() orderForm!: FormGroup;
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string | null>();

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;
  http = inject(HttpClient);

  errorMessage: string = ''; // Conservé pour la logique, mais plus affiché
  processing: boolean = false;

  async ngOnInit() {
    console.log('Initialisation de Step4...');
    try {
      this.stripe = await loadStripe('pk_test_51Qtm19I3zg9rkCm2XRAv4nyJpzCEokVp2h1Nh2bVmDj1D6FJFqfAFW1kCjxYNGUl3oglV5d8G2Z93xvc9J2QQZ0Y00ficTvBFP');
      if (this.stripe) {
        this.elements = this.stripe.elements();
        this.cardElement = this.elements.create('card');
        this.cardElement.mount('#card-element');
        console.log('Stripe initialisé et élément de carte monté');
      } else {
        throw new Error('Stripe non initialisé');
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Stripe:', error);
      this.errorMessage = 'Erreur lors du chargement de Stripe. Veuillez réessayer.';
    }
  }

  async processPayment() {
    console.log('Début de processPayment...');
    if (!this.stripe || !this.elements || !this.cardElement) {
      console.error('Stripe ou éléments non disponibles');
      this.errorMessage = 'Système de paiement non initialisé.';
      return;
    }

    const paymentAmount = this.orderForm.getRawValue().paymentAmount;
    if (!paymentAmount || isNaN(parseFloat(paymentAmount))) {
      console.error('Montant invalide:', paymentAmount);
      this.errorMessage = 'Montant de paiement invalide.';
      return;
    }

    this.processing = true;
    this.errorMessage = '';

    try {
      const amountInCents = Math.round(parseFloat(paymentAmount) * 100);
      console.log('Montant à envoyer au backend (centimes):', amountInCents);

      const response = await this.http.post<{ clientSecret: string }>(
        'http://localhost:8080/api/public/payments/create-payment-intent',
        { amount: amountInCents }
      ).toPromise();

      console.log('Réponse brute du backend:', response);
      if (!response || !response.clientSecret) {
        throw new Error('Aucun clientSecret valide reçu du backend');
      }
      console.log('clientSecret extrait:', response.clientSecret);

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(response.clientSecret, {
        payment_method: { card: this.cardElement }
      });

      if (error) {
        console.error('Erreur Stripe:', error);
        this.errorMessage = 'Échec du paiement : ' + error.message;
        this.submit.emit(null);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        const transactionId = paymentIntent.id;
        this.orderForm.patchValue({ transactionId });
        console.log('Paiement réussi, transactionId:', transactionId);
        this.submit.emit(transactionId);
      } else {
        throw new Error('Statut du paiement inattendu: ' + paymentIntent?.status);
      }
    } catch (error) {
      console.error('Erreur dans processPayment:', error);
      this.errorMessage = 'Erreur lors du paiement : ' + (error instanceof Error ? error.message : 'Erreur inconnue');
      this.submit.emit(null);
    } finally {
      this.processing = false;
      console.log('processPayment terminé, processing:', this.processing);
    }
  }

  goBack(): void {
    this.prev.emit();
    console.log('Retour à l\'étape précédente');
  }
}
