import { Component } from '@angular/core';
import {AuthComponent} from '../../../features/auth/auth.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    AuthComponent,
    RouterLink
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
}
