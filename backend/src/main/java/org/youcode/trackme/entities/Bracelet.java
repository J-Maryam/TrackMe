package org.youcode.trackme.entities;

import jakarta.persistence.*;
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

    @Column(unique = true)
    @NotNull
    private String serialNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BraceletStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BraceletState state;

    @OneToOne(mappedBy = "bracelet")
    private Patient patient;

    @OneToMany(mappedBy = "bracelet")
    private List<Location> locations = new ArrayList<>();
}
