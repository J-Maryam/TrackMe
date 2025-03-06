package org.youcode.trackme.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.ErrorResponse;
import org.youcode.trackme.common.exceptions.EntityCreationException;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.services.OrderService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public/orders")
@CrossOrigin(origins = "http://localhost:4200") // Autorise uniquement cette origine
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeOrder(@Valid @RequestBody OrderRequestDTO orderRequestDTO) {
        try {
            orderService.completeOrder(orderRequestDTO);
            Map<String, String> response = new HashMap<>();
            response.put("text", "Commande insérée avec succès");
            return ResponseEntity.ok(response); // Retourner 200 avec un message de succès
        } catch (EntityCreationException e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "Entity Creation Error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        } catch (EntityNotFoundException e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "Not Found", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}