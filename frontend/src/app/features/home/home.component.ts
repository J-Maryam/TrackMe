import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, NgOptimizedImage]
})
export class HomeComponent {
}
