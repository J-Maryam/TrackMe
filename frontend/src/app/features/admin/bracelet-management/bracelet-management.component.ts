import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Bracelet } from '../../../shared/models/bracelet.model';
import { BraceletService } from '../../../core/services/bracelet.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { PagedResponse } from '../../../shared/models/paged-response.model';
import { FormsModule } from '@angular/forms'; // Pour ngModel

@Component({
  selector: 'app-bracelet-management',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule], // Ajoutez FormsModule
  templateUrl: './bracelet-management.component.html',
  styleUrls: ['./bracelet-management.component.css'],
})
export class BraceletManagementComponent implements OnInit {
  bracelets: Bracelet[] = [];
  displayedBracelets: Bracelet[] = []; // Pour la recherche
  isLoading = false;
  errorMessage: string | null = null;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  searchQuery = '';

  constructor(
    private braceletService: BraceletService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminAccess();
    this.loadBracelets();
  }

  private checkAdminAccess(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
    }
  }

  loadBracelets(): void {
    this.isLoading = true;
    this.braceletService.getAllBracelets(this.currentPage, this.pageSize).subscribe({
      next: (response: ApiResponse<PagedResponse<Bracelet>>) => {
        if (response.success) {
          this.bracelets = response.data.content;
          this.currentPage = response.data.pageNumber;
          this.pageSize = response.data.pageSize;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
          this.updateDisplayedBracelets();
          this.isLoading = false;
        } else {
          this.errorMessage = response.message || 'Erreur inattendue lors du chargement des bracelets.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors du chargement des bracelets.';
        this.isLoading = false;
      },
    });
  }

  activateBracelet(braceletId: number): void {
    this.braceletService.activateBracelet(braceletId).subscribe({
      next: () => {
        this.updateBraceletStatus(braceletId, true);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de l’activation du bracelet.';
      },
    });
  }

  deactivateBracelet(braceletId: number): void {
    this.braceletService.deactivateBracelet(braceletId).subscribe({
      next: () => {
        this.updateBraceletStatus(braceletId, false);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de la désactivation du bracelet.';
      },
    });
  }

  private updateBraceletStatus(braceletId: number, enabled: boolean): void {
    const bracelet = this.bracelets.find(b => b.id === braceletId);
    if (bracelet) {
      bracelet.status = enabled ? 'ACTIVE' : 'INACTIVE';
      this.updateDisplayedBracelets();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadBracelets();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadBracelets();
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadBracelets();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.loadBracelets();
  }

  searchBracelets(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
    this.updateDisplayedBracelets();
  }

  private updateDisplayedBracelets(): void {
    if (this.searchQuery) {
      this.displayedBracelets = this.bracelets.filter(bracelet =>
        bracelet.serialNumber.toLowerCase().includes(this.searchQuery) ||
        (bracelet.patient?.username ).toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.displayedBracelets = [...this.bracelets];
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow);

    if (endPage - startPage < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow);
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}
