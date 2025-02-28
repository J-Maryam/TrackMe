import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import { pastDateValidator } from '../../../validators/pastDateValidator';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, DatePipe],
  styleUrls: ['./step3.component.css']
})
export class Step3Component{
  @Input() orderForm: FormGroup | undefined;

  selectedColor: string = 'gray';
  selectedBraceletImage: string = 'https://i.etsystatic.com/37484115/r/il/99a7da/5169969530/il_570xN.5169969530_snqw.jpg';

  braceletImages: { [key: string]: string } = {
    'gray': 'https://i.etsystatic.com/37484115/r/il/99a7da/5169969530/il_570xN.5169969530_snqw.jpg',
    'blue': 'https://i.etsystatic.com/44802764/r/il/a28c4d/5145060151/il_570xN.5145060151_82le.jpg',
    'black': 'https://i.etsystatic.com/37484115/r/il/882981/5358254745/il_570xN.5358254745_ax4p.jpg'
  };

  selectColor(color: string) {
    this.selectedColor = color;
    this.selectedBraceletImage = this.braceletImages[color];

    if (this.orderForm) {
      this.orderForm.patchValue({ braceletColor: color });
    }
  }

  getDeliveryDate(): Date {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5);
    return deliveryDate;
  }
}
