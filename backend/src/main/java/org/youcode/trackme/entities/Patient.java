package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.*;
import org.youcode.trackme.security.entities.AppUser;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDate dateOfBirth;

    @Transient
    private int age;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "caregiver_id")
    private AppUser caregiver;

    private LocalDateTime dateCreation;
}