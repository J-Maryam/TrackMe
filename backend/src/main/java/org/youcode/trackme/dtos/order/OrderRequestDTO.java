package org.youcode.trackme.dtos.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record OrderRequestDTO(
        @NotNull Long braceletId,
        @NotNull Long userId,
        @NotNull @Positive double totalAmount,
        @NotNull String deliveryAddress,
        @NotNull String transactionId
) {}