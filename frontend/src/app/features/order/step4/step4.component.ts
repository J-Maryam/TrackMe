import { Component, Input } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./step4.component.css']
})
export class Step4Component {
  @Input() orderForm: FormGroup | undefined;
}
