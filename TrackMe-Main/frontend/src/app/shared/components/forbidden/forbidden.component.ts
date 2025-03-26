import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {}
