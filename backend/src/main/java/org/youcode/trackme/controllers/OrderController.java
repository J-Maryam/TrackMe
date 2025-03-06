package org.youcode.trackme.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.services.OrderService;

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
    public ResponseEntity<String> completeOrder(@RequestBody OrderRequestDTO orderData) {
        try {
            orderService.completeOrder(orderData);
            return new ResponseEntity<>("Commande insérée avec succès", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de l'insertion: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}