package org.youcode.trackme.services.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.entities.Order;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.entities.Payment;
import org.youcode.trackme.entities.enums.OrderStatus;
import org.youcode.trackme.entities.enums.PaymentStatus;
import org.youcode.trackme.mappers.OrderMapper;
import org.youcode.trackme.repositories.*;
import org.youcode.trackme.security.entities.AppRole;
import org.youcode.trackme.security.entities.AppUser;
import org.youcode.trackme.security.repositories.AppRoleRepository;
import org.youcode.trackme.services.OrderService;
import org.youcode.trackme.services.PaymentService;

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

    @Override
    public void completeOrder(OrderRequestDTO orderData) {
        // Étape 1 : Enregistrer l'utilisateur
        AppUser user = new AppUser();
        user.setUsername(orderData.username());
        user.setEmail(orderData.email());
        user.setPassword(passwordEncoder.encode(orderData.password()));
        user.setAddress(orderData.address());

        user.setPhoneNumber(orderData.phoneNumber());
        AppRole role = appRoleRepository.findById(2L)
                .orElseThrow(() -> new EntityNotFoundException("Rôle non trouvé pour ID 2 (client)."));
        user.setRole(role);
        userRepository.save(user);

        // Étape 2 : Enregistrer le patient
        Patient patient = new Patient();
        patient.setUsername(orderData.patientName());
        patient.setDateOfBirth(orderData.dateOfBirth());
        patient.setAge(orderData.patientAge());
        patient.setCaregiver(user); // Lier au user
        patientRepository.save(patient);

        // Étape 3 : Enregistrer le bracelet
        Bracelet bracelet = new Bracelet();
        bracelet.setColor(orderData.braceletColor());
        bracelet.setPatient(patient); // Lier au patient
        braceletRepository.save(bracelet);

        // Étape 4 : Mettre à jour le paiement (déjà créé par PaymentService)
        Payment payment = paymentRepository.findByTransactionId(orderData.transactionId())
                .orElseThrow(() -> new IllegalArgumentException("Paiement non trouvé pour transactionId: " + orderData.transactionId()));
        payment.setStatus(PaymentStatus.SUCCEEDED);
        payment.setAmount(Integer.parseInt(orderData.paymentAmount().replaceAll("[^0-9]", "")));
        paymentRepository.save(payment);

        // Étape 5 : Créer et sauvegarder l'ordre
        Order order = new Order();
        order.setUser(user);
        order.setPatient(patient);
        order.setBracelet(bracelet);
        order.setPayment(payment);
        orderRepository.save(order);
    }}