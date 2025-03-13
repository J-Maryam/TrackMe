import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../shared/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../../shared/services/modal.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  imports: [NgIf, NgForOf, SidebarComponent, DatePipe, OrderDetailsComponent],
  standalone: true,
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  totalElements = 0;
  totalPages = 0;
  currentPage = 1;
  pageSize = 5;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.orderService.getOrders(this.currentPage - 1, this.pageSize).subscribe({
      next: (response) => {
        this.orders = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.pageNumber + 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.errorMessage = 'Failed to load orders. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadOrders();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadOrders();
    }
  }

  openOrderDetails(order: any): void {
    this.modalService.openModal(order);
  }
}
