import { Component, OnInit } from '@angular/core';
import { BraceletService } from '../../../core/services/bracelet.service';
import { AuthService } from '../../../core/services/auth.service';
import { Bracelet } from '../../../shared/models/bracelet.model';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assigned-bracelets',
  templateUrl: './assigned-bracelets.component.html',
  styleUrls: ['./assigned-bracelets.component.css'],
  imports: [
    SidebarComponent,
    NgIf,
    NgForOf,
    NgClass,
    DatePipe
  ],
  standalone: true
})
export class AssignedBraceletsComponent implements OnInit {
  bracelets: Bracelet[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private braceletService: BraceletService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBracelets();
  }

  loadBracelets(): void {
    this.isLoading = true;
    this.braceletService.getAssignedBracelets().subscribe({
      next: (bracelets) => {
        this.bracelets = bracelets;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Unable to load bracelets. Please try again later.';
        console.error('Error:', err);
      },
    });
  }

  trackPatient(patientId: number): void {
    this.router.navigate(['/patient-tracking', patientId]);
  }
}
