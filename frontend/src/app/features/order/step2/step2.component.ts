import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  standalone: true,
  imports: [
    NgClass
  ],
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
  @Input() orderForm: FormGroup | undefined;

  selectedBracelet: string | null = null;

  selectBracelet(bracelet: string) {
    this.selectedBracelet = bracelet;

    if (this.orderForm) {
      this.orderForm.patchValue({ bracelet });
    }
  }
}
