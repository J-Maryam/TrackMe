import { Component } from '@angular/core';
import {LoginComponent} from '../../../features/auth/login/login.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    LoginComponent,
    RouterLink
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
}
