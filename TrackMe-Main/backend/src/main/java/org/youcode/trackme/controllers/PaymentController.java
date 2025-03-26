package org.youcode.trackme.controllers;

import com.stripe.exception.StripeException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.ApiResponse;
import org.youcode.trackme.common.ErrorResponse;
import org.youcode.trackme.common.PagedResponse;
import org.youcode.trackme.common.exceptions.EntityCreationException;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.dtos.payment.ConfirmPaymentRequest;
import org.youcode.trackme.dtos.payment.PaymentRequestDTO;
import org.youcode.trackme.dtos.payment.PaymentResponseDTO;
import org.youcode.trackme.entities.Payment;
import org.youcode.trackme.mappers.PaymentMapper;
import org.youcode.trackme.services.PaymentService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentMapper paymentMapper;

    @Autowired
    public PaymentController(PaymentService paymentService, PaymentMapper paymentMapper) {
        this.paymentService = paymentService;
        this.paymentMapper = paymentMapper;
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@Valid @RequestBody PaymentRequestDTO request) {
        try {
            String clientSecret = paymentService.createPaymentIntent(request);
            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", clientSecret);
            return ResponseEntity.ok(responseData);
        } catch (StripeException e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(), "Stripe Error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (EntityCreationException e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "Entity Creation Error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        } catch (IllegalArgumentException e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(), "Invalid Argument", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@Valid @RequestBody ConfirmPaymentRequest request) {
        try {
            Payment payment = paymentService.confirmPayment(request.transactionId());
            PaymentResponseDTO paymentResponse = paymentMapper.toDto(payment);
            return ResponseEntity.ok(paymentResponse); // Retourner directement le DTO
        } catch (EntityNotFoundException e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "Not Found", "Paiement non trouvé : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", "Erreur inattendue : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<PaymentResponseDTO>>> getAll(Pageable pageable) {
        PagedResponse<PaymentResponseDTO> response = paymentService.getAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(response, "Data retrieved successfully"));
    }
}