import {Order} from './order.model';

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
