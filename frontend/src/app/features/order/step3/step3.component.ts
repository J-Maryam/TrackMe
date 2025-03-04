import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {NgIf, NgClass, DatePipe, NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, DatePipe, NgForOf, NgStyle],
  styleUrls: ['./step3.component.css']
})
export class Step3Component {
  @Input() orderForm!: FormGroup;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  selectedColor: string = 'gray';
  availableColors: string[] = ['gray', 'blue', 'black'];
  braceletImages: { [key: string]: string } = {
    'gray': 'https://i.etsystatic.com/37484115/r/il/99a7da/5169969530/il_570xN.5169969530_snqw.jpg',
    'blue': 'https://i.etsystatic.com/44802764/r/il/a28c4d/5145060151/il_570xN.5145060151_82le.jpg',
    'black': 'https://i.etsystatic.com/37484115/r/il/882981/5358254745/il_570xN.5358254745_ax4p.jpg'
  };

  constructor() {}

  ngOnInit(): void {
    // Récupérer la couleur sauvegardée dans localStorage (s'il y en a une)
    const savedColor = localStorage.getItem('braceletColor');
    if (savedColor && this.availableColors.includes(savedColor)) {
      this.selectedColor = savedColor;
      this.orderForm.patchValue({ braceletColor: savedColor });
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.orderForm.patchValue({ braceletColor: color });

    // Sauvegarde dans localStorage
    localStorage.setItem('braceletColor', color);
  }

  saveAndNext(): void {
    // Marquer le champ comme touché pour la validation
    this.orderForm.get('braceletColor')?.markAsTouched();

    // Vérifier si le champ est valide
    if (this.orderForm.get('braceletColor')?.valid) {
      this.next.emit();
    }
  }

  getDeliveryDate(): Date {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5);
    return deliveryDate;
  }
}
