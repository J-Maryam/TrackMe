import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import {CurrencyPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf
  ],
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {
  @Input() orderForm: FormGroup | undefined;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  totalAmount: number = 50; // Ex: montant en euros
  errorMessage: string = '';
  transactionId: string | null = null;

  async ngOnInit() {
    // La clé publique de stripe
    this.stripe = await loadStripe('pk_test_51Qtm19I3zg9rkCm2XRAv4nyJpzCEokVp2h1Nh2bVmDj1D6FJFqfAFW1kCjxYNGUl3oglV5d8G2Z93xvc9J2QQZ0Y00ficTvBFP');  // Remplace avec ta clé Stripe

    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');  // Créer un champ de carte sécurisé
      this.cardElement.mount('#card-element');  // Afficher le champ dans le div #card-element
    }
  }

  // 🔥 Méthode pour traiter le paiement Stripe
  async processPayment() {
    if (!this.stripe || !this.elements || !this.cardElement) {
      this.errorMessage = 'Erreur lors de l’initialisation du paiement.';
      return;
    }

    // 🔄 Demander au backend de créer un PaymentIntent
    const response = await fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: this.totalAmount * 100 }) // Montant en centimes
    });

    const { clientSecret } = await response.json();

    // 💳 Confirmer le paiement avec Stripe
    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: this.cardElement }
    });

    if (error) {
      this.errorMessage = 'Échec du paiement : ' + error.message;
    } else if (paymentIntent.status === 'succeeded') {
      this.transactionId = paymentIntent.id; // Stocke l'ID du paiement réussi
      this.errorMessage = '';
    }
  }
}
