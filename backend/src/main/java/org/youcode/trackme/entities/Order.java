package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.youcode.trackme.entities.enums.OrderStatus;
import org.youcode.trackme.security.entities.AppUser;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "bracelet_id", nullable = false)
    private Bracelet bracelet;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status; // EN_ATTENTE, PAYEE, LIVREE, CONFIRMEE

    @Column(nullable = false)
    @Positive
    private double totalAmount;

    @Column(nullable = false)
    private LocalDateTime dateCommande;

    private LocalDateTime deliveryDate;

    private String deliveryAddress;

    @PrePersist
    public void prePersist() {
        this.dateCommande = LocalDateTime.now();
        if (this.status == null) {
            this.status = OrderStatus.EN_ATTENTE; // Statut par défaut
        }
    }
}