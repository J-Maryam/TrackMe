package org.youcode.trackme.dtos.payment;

import jakarta.validation.constraints.NotBlank;

public record ConfirmPaymentRequest(
        @NotBlank String transactionId
) {}