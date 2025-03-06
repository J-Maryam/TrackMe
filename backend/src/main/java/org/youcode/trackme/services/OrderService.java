package org.youcode.trackme.services;

import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;

public interface OrderService {
    void completeOrder(OrderRequestDTO orderData);
}
