import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [
    RouterLink
  ],
  templateUrl: './hero-section.component.html',
  standalone: true,
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
