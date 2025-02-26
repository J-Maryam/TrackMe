  import { Component } from '@angular/core';
  import {RouterLink} from '@angular/router';
  import {NgOptimizedImage} from '@angular/common';

  @Component({
    selector: 'app-hero-section',
    imports: [
      RouterLink,
      NgOptimizedImage
    ],
    templateUrl: './hero-section.component.html',
    standalone: true,
    styleUrl: './hero-section.component.css'
  })
  export class HeroSectionComponent {
    // image = "logo_homepage.png";
    image = 'bracelet-gps.png';
  }
