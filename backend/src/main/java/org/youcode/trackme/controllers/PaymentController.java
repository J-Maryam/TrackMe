package org.youcode.trackme.controllers;

import com.stripe.exception.StripeException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.dtos.payment.ConfirmPaymentRequest;
import org.youcode.trackme.dtos.payment.PaymentRequestDTO;
import org.youcode.trackme.dtos.payment.PaymentResponseDTO;
import org.youcode.trackme.mappers.PaymentMapper;
import org.youcode.trackme.services.PaymentService;

@RestController
@RequestMapping("/api/public/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentMapper paymentMapper;

    @Autowired
    public PaymentController(PaymentService paymentService, PaymentMapper paymentMapper) {
        this.paymentService = paymentService;
        this.paymentMapper = paymentMapper;
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<String> createPaymentIntent(@Valid @RequestBody PaymentRequestDTO request) {
        try {
            String clientSecret = paymentService.createPaymentIntent(request);
            return new ResponseEntity<>(clientSecret, HttpStatus.OK);
        } catch (StripeException e) {
            return new ResponseEntity<>("Erreur lors de la création du paiement : " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<PaymentResponseDTO> confirmPayment(@Valid @RequestBody ConfirmPaymentRequest request) {
        PaymentResponseDTO paymentResponse = paymentMapper.toDto(paymentService.confirmPayment(request.transactionId()));
        return new ResponseEntity<>(paymentResponse, HttpStatus.OK);
    }
}