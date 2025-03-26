package org.youcode.trackme.dtos.order;

import java.time.LocalDate;

public record OrderRequestDTO(
        String username,
        String email,
        String password,
        String address,
        String phoneNumber,
        String patientName,
        LocalDate dateOfBirth,
        Integer patientAge,
        String braceletColor,
        String paymentAmount,
        String transactionId
) {}