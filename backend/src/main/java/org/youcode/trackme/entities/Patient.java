package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.youcode.trackme.entities.enums.DiseaseStage;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String username;

    @Past
    @NotNull
    private Date dateOfBirth;

    @Transient
    private int age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiseaseStage diseaseStage;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bracelet_id", referencedColumnName = "id")
    private Bracelet bracelet;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User caregiver;

    @ManyToOne
    @JoinColumn(name = "geofence_id")
    private Geofence geofence;

    @OneToMany(mappedBy = "patient")
    private List<Alert> alerts;

    private LocalDateTime dateCreation;

}
