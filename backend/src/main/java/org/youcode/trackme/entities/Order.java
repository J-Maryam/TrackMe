package org.youcode.trackme.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.youcode.trackme.entities.enums.OrderStatus;
import org.youcode.trackme.entities.enums.PaymentMethod;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "bracelet_id", nullable = false)
    private Bracelet bracelet;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status; // EN_ATTENTE, PAYEE, LIVREE, CONFIRMEE

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod; // CARTE, PAYPAL

    private double totalAmount;
    private LocalDateTime dateCommande;
    private LocalDateTime deliveryDate;
    private String deliveryAddress;
}