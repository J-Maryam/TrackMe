import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  standalone: true,
  styleUrls: ['./step3.component.css']
})
export class Step3Component {
  @Input() orderForm: FormGroup | undefined;
}
