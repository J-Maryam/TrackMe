package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.*;
import org.youcode.trackme.security.entities.AppUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

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

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bracelet_id", referencedColumnName = "id")
    private Bracelet bracelet;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser caregiver;

    private LocalDateTime dateCreation;

    @PostLoad
    @PostPersist
    @PostUpdate
    public void calculateAge() {
        if (dateOfBirth != null) {
            this.age = Period.between(dateOfBirth, LocalDate.now()).getYears();
        }
    }
}
