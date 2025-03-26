import { Component } from '@angular/core';
import { AuthComponent } from '../../../features/auth/auth.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrollToHome() {
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToFeatures() {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToAbout() {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToFaq() {
    const element = document.getElementById('faq');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
