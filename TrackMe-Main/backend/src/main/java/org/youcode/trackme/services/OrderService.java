package org.youcode.trackme.services;

import org.springframework.data.domain.Pageable;
import org.youcode.trackme.common.PagedResponse;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;

public interface OrderService {
    void completeOrder(OrderRequestDTO orderData);
    PagedResponse<OrderResponseDTO> getAll(Pageable pageable);
}
