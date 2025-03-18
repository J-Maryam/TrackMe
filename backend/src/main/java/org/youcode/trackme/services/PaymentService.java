package org.youcode.trackme.services;

import com.stripe.exception.StripeException;
import org.springframework.data.domain.Pageable;
import org.youcode.trackme.common.PagedResponse;
import org.youcode.trackme.dtos.payment.PaymentRequestDTO;
import org.youcode.trackme.dtos.payment.PaymentResponseDTO;
import org.youcode.trackme.entities.Payment;

public interface PaymentService {
    String createPaymentIntent(PaymentRequestDTO requestDTO) throws StripeException;
    Payment confirmPayment(String transactionId);
    PagedResponse<PaymentResponseDTO> getAll(Pageable pageable);
}