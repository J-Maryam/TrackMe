package org.youcode.trackme.dtos.payment;

import org.youcode.trackme.entities.enums.PaymentStatus;

public record PaymentRequestDTO(
        Long orderId,
        PaymentStatus status,
        Double amount,
        String transactionId
) {}