package org.youcode.trackme.dtos.order;

import org.youcode.trackme.entities.enums.OrderStatus;

public record OrderRequestDTO(
        Long userId,
        Long braceletId,
        OrderStatus status,
        double totalAmount,
        String deliveryAddress
) {}