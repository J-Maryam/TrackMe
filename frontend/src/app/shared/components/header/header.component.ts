import { Component, ViewChild } from '@angular/core';
import {LoginComponent} from '../../../features/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    LoginComponent
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('loginPopup') loginPopup!: LoginComponent;

  openLogin() {
    this.loginPopup.openPopup();
  }
}
