package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    @Column(nullable = false)
    private Double amount; // Montant du paiement

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status; // PENDING, SUCCEEDED, FAILED

    @Column(nullable = false)
    private LocalDateTime datePaiement;

    @Column(unique = true)
    private String transactionId; // ID Stripe (ex. pi_xxxxx)

    @PrePersist
    public void prePersist() {
        this.datePaiement = LocalDateTime.now();
        if (this.status == null) {
            this.status = PaymentStatus.PENDING; // Statut par défaut
        }
    }
}