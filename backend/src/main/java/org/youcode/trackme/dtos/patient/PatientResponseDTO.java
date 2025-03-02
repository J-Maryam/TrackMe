package org.youcode.trackme.dtos.patient;

import org.youcode.trackme.dtos.user.EmbeddableUserResponseDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record PatientResponseDTO(
        Long id,
        String username,
        LocalDate dateOfBirth,
        int age,
//        EmbeddableBraceletResponseDTO bracelet,
        EmbeddableUserResponseDTO caregiver,
        LocalDateTime dateCreation
) {}