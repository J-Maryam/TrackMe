import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  standalone: true,
  imports: [NgClass, DatePipe],
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
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
