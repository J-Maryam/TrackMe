package org.youcode.trackme.entities;

import jakarta.persistence.*;
import lombok.*;
import org.youcode.trackme.entities.enums.RoleEnum;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, unique = true, nullable = false)
    private RoleEnum name;
}
