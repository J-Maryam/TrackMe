package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.youcode.trackme.entities.enums.BraceletStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bracelet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = true) // Rendre nullable pour permettre la génération
    private String serialNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BraceletStatus status;

    @NotBlank(message = "La couleur ne doit pas être vide")
    private String color;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "patient_id", unique = true)
    private Patient patient;

    @OneToMany(mappedBy = "bracelet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Location> locations = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (this.serialNumber == null || this.serialNumber.isEmpty()) {
            this.serialNumber = generateSerialNumber();
        }
        if (this.status == null) {
            this.status = BraceletStatus.INACTIVE;
        }
    }

    private String generateSerialNumber() {
        String randomPart = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "BRAC-" + randomPart;
    }
}