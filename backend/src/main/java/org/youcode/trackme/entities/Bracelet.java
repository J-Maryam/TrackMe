package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.youcode.trackme.entities.enums.BraceletState;
import org.youcode.trackme.entities.enums.BraceletStatus;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bracelet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    private String serialNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BraceletStatus status;

    @NotBlank
    private String color; // Ex: "Rouge", "Bleu", "Vert"

    @OneToOne(mappedBy = "bracelet")
    private Patient patient;

    @OneToMany(mappedBy = "bracelet")
    private List<Location> locations = new ArrayList<>();
}
