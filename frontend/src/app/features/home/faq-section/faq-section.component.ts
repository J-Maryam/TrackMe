import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-faq-section',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './faq-section.component.html',
  standalone: true,
  styleUrl: './faq-section.component.css'
})
export class FaqSectionComponent {
  activeFAQ: number | null = null;

  faqList = [
    {
      question: "🧠 Qu'est-ce que la maladie d'Alzheimer ?",
      answer: "La maladie d'Alzheimer est un trouble neurologique progressif qui entraîne une perte de mémoire et une confusion croissante. Elle affecte principalement les personnes âgées."
    },
    {
      question: "🔍 Pourquoi un bracelet pour les personnes atteintes d'Alzheimer ?",
      answer: "Les personnes souffrant d'Alzheimer peuvent se perdre facilement. Notre bracelet contient des informations d'urgence et permet de les identifier rapidement en cas de besoin."
    },
    {
      question: "📍 Comment fonctionne le bracelet ?",
      answer: "Le bracelet est équipé d'un QR code et d'une puce NFC permettant aux secours ou aux passants d'accéder aux informations essentielles du porteur (nom, contacts d'urgence, état de santé)."
    },
    {
      question: "📦 Comment commander un bracelet ?",
      answer: "Vous pouvez commander votre bracelet directement sur notre site en quelques clics. Une personnalisation est possible avec des informations spécifiques."
    },
    {
      question: "💳 Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons les paiements par carte bancaire (Stripe), PayPal et virement bancaire."
    }
  ];

  toggleFAQ(index: number) {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }
}
