package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Past
    private Date dateOfBirth;

    @Transient
    private int age;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bracelet_id", referencedColumnName = "id")
    private Bracelet bracelet;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User caregiver;
}
