package org.youcode.trackme.dtos.patient;

import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.entities.User;

import java.time.LocalDateTime;
import java.util.Date;

public record PatientResponseDTO(
        Long id,
        String username,
        Date dateOfBirth,
        int age,
        Bracelet bracelet,
        User caregiver,
        LocalDateTime dateCreation
) {}