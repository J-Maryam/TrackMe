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
  @Output() submit = new EventEmitter<void>();

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;
  http = inject(HttpClient);

  errorMessage: string = '';
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
      this.errorMessage = 'Erreur lors du chargement de Stripe. Veuillez réessayer.';
      console.error('Erreur lors de l\'initialisation de Stripe:', error);
    }
  }

  async processPayment() {
    console.log('Début de processPayment...');
    if (!this.stripe || !this.elements || !this.cardElement) {
      this.errorMessage = 'Système de paiement non initialisé.';
      console.error('Stripe ou éléments non disponibles');
      return;
    }

    const paymentAmount = this.orderForm.getRawValue().paymentAmount;
    if (!paymentAmount || isNaN(parseFloat(paymentAmount))) {
      this.errorMessage = 'Montant de paiement invalide.';
      console.error('Montant invalide:', paymentAmount);
      return;
    }

    this.processing = true;
    this.errorMessage = '';

    try {
      const amount = parseFloat(paymentAmount) * 100;
      console.log('Montant à envoyer au backend:', amount);

      // Étape 1 : Créer un PaymentIntent
      const response = await this.http.post<{ clientSecret: string }>(
        'http://localhost:8080/api/public/payments/create-payment-intent',
        { amount }
      ).toPromise();

      console.log('Réponse brute du backend:', response);
      if (!response || !response.clientSecret) {
        throw new Error('Aucun clientSecret valide reçu du backend');
      }
      console.log('clientSecret extrait:', response.clientSecret);

      // Étape 2 : Confirmer le paiement avec Stripe
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(response.clientSecret, {
        payment_method: { card: this.cardElement }
      });

      if (error) {
        this.errorMessage = 'Échec du paiement : ' + error.message;
        console.error('Erreur Stripe:', error);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        this.orderForm.patchValue({ transactionId: paymentIntent.id });
        console.log('Paiement réussi, transactionId:', paymentIntent.id);
        this.submit.emit();
      } else {
        throw new Error('Statut du paiement inattendu: ' + paymentIntent?.status);
      }
    } catch (error) {
      this.errorMessage = 'Erreur lors du paiement : ' + (error instanceof Error ? error.message : 'Erreur inconnue');
      console.error('Erreur dans processPayment:', error);
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
