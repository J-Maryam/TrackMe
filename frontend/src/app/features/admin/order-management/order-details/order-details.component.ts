import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../shared/services/modal.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  order: any;

  constructor(private modalService: ModalService) {
    this.modalService.orderData$.subscribe((order) => {
      this.order = order;
    });
  }

  calculateAge(dateOfBirth: string | Date): number | string {
    if (!dateOfBirth) return 'N/A';

    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 0 ? age : 'N/A';
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
