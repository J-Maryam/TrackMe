import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {HeroSectionComponent} from './hero-section/hero-section.component';
import {FonctionnalitiesSectionComponent} from './fonctionnalities-section/fonctionnalities-section.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, NgOptimizedImage, HeroSectionComponent, FonctionnalitiesSectionComponent]
})
export class HomeComponent {
}
