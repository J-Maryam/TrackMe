package org.youcode.trackme.dtos.order;

import org.youcode.trackme.entities.enums.OrderStatus;
import org.youcode.trackme.entities.enums.PaymentMethod;

import java.time.LocalDateTime;

public record OrderResponseDTO(
        Long id,
        Long userId,
        Long braceletId,
        OrderStatus status,
        PaymentMethod paymentMethod,
        double totalAmount,
        LocalDateTime dateCommande,
        LocalDateTime dateLivraison,
        String deliveryAddress
) {}