package org.youcode.trackme.dtos.order;

import org.youcode.trackme.entities.enums.OrderStatus;
import org.youcode.trackme.entities.enums.PaymentMethod;

public record OrderRequestDTO(
        Long userId,
        Long braceletId,
        OrderStatus status,
        PaymentMethod paymentMethod,
        double totalAmount,
        String deliveryAddress
) {}