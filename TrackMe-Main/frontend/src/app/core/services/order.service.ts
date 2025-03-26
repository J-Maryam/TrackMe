import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order.model';

interface ApiResponse {
  data: {
    content: Order[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
  };
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/public/orders';

  constructor(private http: HttpClient) {}

  getOrders(page: number = 0, size: number = 10): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOrdersByBraceletId(braceletId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/bracelet/${braceletId}`);
  }
}
