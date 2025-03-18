package org.youcode.trackme.dtos.order;

import org.youcode.trackme.dtos.bracelet.EmbeddableBraceletResponseDTO;
import org.youcode.trackme.dtos.patient.EmbeddablePatientResponseDTO;
import org.youcode.trackme.dtos.payment.EmbeddablePaymentResponseDTO;
import org.youcode.trackme.dtos.user.EmbeddableUserResponseDTO;
import org.youcode.trackme.entities.enums.OrderStatus;

import java.time.LocalDateTime;

public record OrderResponseDTO(
        Long id,
        EmbeddableBraceletResponseDTO bracelet,
        EmbeddableUserResponseDTO user,
        EmbeddablePatientResponseDTO patient,
        OrderStatus status,
        double totalAmount,
        LocalDateTime orderDate,
        LocalDateTime dateLivraison,
        String deliveryAddress,
        EmbeddablePaymentResponseDTO payment
) {}