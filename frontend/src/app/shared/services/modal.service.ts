import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpen = new BehaviorSubject<boolean>(false);
  private orderData = new BehaviorSubject<any>(null);

  // Observable pour suivre l'état du modal
  isOpen$ = this.isOpen.asObservable();

  // Observable pour suivre les données de la commande
  orderData$ = this.orderData.asObservable();

  // Ouvrir le modal avec les données de la commande
  openModal(order: any): void {
    this.orderData.next(order);
    this.isOpen.next(true);
  }

  // Fermer le modal
  closeModal(): void {
    this.isOpen.next(false);
    this.orderData.next(null);
  }
}
