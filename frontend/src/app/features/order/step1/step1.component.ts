import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./step1.component.css']
})
export class Step1Component {
  @Input() orderForm!: FormGroup;
}
