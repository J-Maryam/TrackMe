package org.youcode.trackme.dtos.order;

import org.youcode.trackme.dtos.bracelet.EmbeddableBraceletResponseDTO;
import org.youcode.trackme.dtos.user.EmbeddableUserResponseDTO;
import org.youcode.trackme.entities.enums.OrderStatus;

import java.time.LocalDateTime;

public record EmbeddableOrderResponseDTO(
        Long id,
        EmbeddableUserResponseDTO userId,
        EmbeddableBraceletResponseDTO braceletId,
        OrderStatus status,
        double totalAmount,
        LocalDateTime orderDate,
        LocalDateTime dateLivraison,
        String deliveryAddress,
        Long paymentId 
) {}