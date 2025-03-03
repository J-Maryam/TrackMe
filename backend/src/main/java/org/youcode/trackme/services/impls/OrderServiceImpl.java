package org.youcode.trackme.services.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.entities.Order;
import org.youcode.trackme.entities.Payment;
import org.youcode.trackme.entities.enums.OrderStatus;
import org.youcode.trackme.mappers.OrderMapper;
import org.youcode.trackme.repositories.BraceletRepository;
import org.youcode.trackme.repositories.OrderRepository;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.services.OrderService;
import org.youcode.trackme.services.PaymentService;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BraceletRepository braceletRepository;
    private final PaymentService paymentService;
    private final OrderMapper orderMapper;

    @Override
    public OrderResponseDTO completeOrder(OrderRequestDTO request) {
        // Confirmer le paiement
        Payment payment = paymentService.confirmPayment(request.transactionId());

        // Créer la commande
        Order order = orderMapper.toEntity(request);
        order.setUser(userRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé")));
        order.setBracelet(braceletRepository.findById(request.braceletId())
                .orElseThrow(() -> new EntityNotFoundException("Bracelet non trouvé")));
        order.setPayment(payment);
        order.setStatus(OrderStatus.PAYEE);

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }
}