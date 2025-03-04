package org.youcode.trackme.dtos.payment;

import org.youcode.trackme.dtos.order.EmbeddableOrderResponseDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.entities.Order;
import org.youcode.trackme.entities.enums.PaymentStatus;

import java.time.LocalDateTime;

public record PaymentResponseDTO(
        Long id,
        Double amount,
        EmbeddableOrderResponseDTO order,
        PaymentStatus status,
        LocalDateTime paymentDate,
        String transactionId
) {}