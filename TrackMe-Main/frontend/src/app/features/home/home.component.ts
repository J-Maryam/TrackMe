import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {HeroSectionComponent} from './hero-section/hero-section.component';
import {FonctionnalitiesSectionComponent} from './fonctionnalities-section/fonctionnalities-section.component';
import {HowItWorksSectionComponent} from './how-it-works-section/how-it-works-section.component';
import {CallToActionSectionComponent} from './call-to-action-section/call-to-action-section.component';
import {FaqSectionComponent} from './faq-section/faq-section.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, NgOptimizedImage, HeroSectionComponent, FonctionnalitiesSectionComponent, HowItWorksSectionComponent, CallToActionSectionComponent, FaqSectionComponent]
})
export class HomeComponent {
}
