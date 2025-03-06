package org.youcode.trackme.services.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.entities.Order;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.entities.Payment;
import org.youcode.trackme.entities.enums.PaymentStatus;
import org.youcode.trackme.mappers.OrderMapper;
import org.youcode.trackme.repositories.*;
import org.youcode.trackme.security.entities.AppRole;
import org.youcode.trackme.security.entities.AppUser;
import org.youcode.trackme.security.repositories.AppRoleRepository;
import org.youcode.trackme.services.OrderService;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final BraceletRepository braceletRepository;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;
    public final AppRoleRepository appRoleRepository;
    private final OrderMapper orderMapper;

    @Override
    public void completeOrder(OrderRequestDTO orderData) {
        // Étape 1 : Mapper et enregistrer l'utilisateur
        AppUser user = orderMapper.toAppUser(orderData);
        user.setPassword(passwordEncoder.encode(orderData.password()));
        AppRole role = appRoleRepository.findById(2L)
                .orElseThrow(() -> new EntityNotFoundException("Rôle non trouvé pour ID 2 (client)."));
        user.setRole(role);
        user = userRepository.save(user);

        // Étape 2 : Mapper et enregistrer le patient
        Patient patient = orderMapper.toPatient(orderData);
        patient.setCaregiver(user); // Lier au user
        patient = patientRepository.save(patient);

        // Étape 3 : Mapper et enregistrer le bracelet
        Bracelet bracelet = orderMapper.toBracelet(orderData);
        bracelet.setPatient(patient);
        bracelet = braceletRepository.save(bracelet);

        // Étape 4 : Mettre à jour le paiement
        Payment payment = paymentRepository.findByTransactionId(orderData.transactionId())
                .orElseThrow(() -> new IllegalArgumentException("Paiement non trouvé pour transactionId: " + orderData.transactionId()));
        payment.setStatus(PaymentStatus.SUCCEEDED);
        payment = paymentRepository.save(payment);

        // Étape 5 : Mapper et enregistrer l'ordre
        Order order = orderMapper.toOrder(orderData);
        order.setUser(user);
        order.setPatient(patient);
        order.setBracelet(bracelet);
        order.setPayment(payment);
        orderRepository.save(order);
    }
}