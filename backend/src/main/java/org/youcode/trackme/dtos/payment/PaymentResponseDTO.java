package org.youcode.trackme.dtos.payment;

import org.youcode.trackme.entities.Order;
import org.youcode.trackme.entities.enums.PaymentStatus;

import java.time.LocalDateTime;

public record PaymentResponseDTO(
        Long id,
        Order order,
        PaymentStatus status,
        LocalDateTime paymentDate,
        String transactionId
) {}