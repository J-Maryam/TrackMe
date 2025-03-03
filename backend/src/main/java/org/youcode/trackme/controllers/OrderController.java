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
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/complete")
    public ResponseEntity<OrderResponseDTO> completeOrder(@Valid @RequestBody OrderRequestDTO request) {
        OrderResponseDTO response = orderService.completeOrder(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}