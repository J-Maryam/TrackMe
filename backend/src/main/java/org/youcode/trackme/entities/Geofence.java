package org.youcode.trackme.entities;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Geofence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double latitude;  // Latitude du centre de la zone
    private double longitude; // Longitude du centre de la zone
    private double radius;    // Rayon de la zone en mètres

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser caregiver;

}

