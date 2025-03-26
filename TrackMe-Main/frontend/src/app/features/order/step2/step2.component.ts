import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    /* ... */],
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
  @Input() orderForm!: FormGroup; // Utiliser le formulaire parent directement
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
}
