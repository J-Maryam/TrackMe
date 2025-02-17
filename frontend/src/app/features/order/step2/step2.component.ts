import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  standalone: true,
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
  @Input() orderForm: FormGroup | undefined;
}
