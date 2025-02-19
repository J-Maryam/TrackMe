package org.youcode.trackme.entities;

import jakarta.persistence.*;
import lombok.*;
import org.youcode.trackme.entities.enums.PaymentStatus;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    private LocalDateTime datePaiement;

    private String transactionId;

    @PrePersist
    public void prePersist() {
        this.datePaiement = LocalDateTime.now();
    }
}
