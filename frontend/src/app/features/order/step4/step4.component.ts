import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./step4.component.css'],
})
export class Step4Component implements OnInit {
  @Input() orderForm: FormGroup | undefined;
  selectedPaymentMethod: string = 'stripe';

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  async ngOnInit() {
    // Charger Stripe avec votre clé publique
    this.stripe = await loadStripe('your-publishable-key');

    // Créer les éléments Stripe
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
    }
  }

  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method;
  }

  async processPayment() {
    if (this.selectedPaymentMethod === 'stripe') {
      await this.handleStripePayment();
    } else if (this.selectedPaymentMethod === 'paypal') {
      this.handlePaypalPayment();
    } else if (this.selectedPaymentMethod === 'bankTransfer') {
      this.handleBankTransfer();
    }
  }

  async handleStripePayment() {
    if (!this.stripe || !this.elements || !this.cardElement) {
      console.error('Stripe n\'est pas initialisé.');
      return;
    }

    // Créer un token de paiement
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      console.error('Erreur lors de la création du token de paiement :', error);
      return;
    }

    // Envoyer le token de paiement à votre backend pour traitement
    console.log('PaymentMethod:', paymentMethod);
    // Exemple : this.orderService.processPayment(paymentMethod.id);
  }

  handlePaypalPayment() {
    console.log('Redirection vers PayPal...');
    // Implémentez la redirection vers PayPal ici
  }

  handleBankTransfer() {
    console.log('Traitement du virement bancaire...');
    // Implémentez la logique pour le virement bancaire ici
  }
}
