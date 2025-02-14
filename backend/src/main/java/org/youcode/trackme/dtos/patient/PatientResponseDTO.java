package org.youcode.trackme.dtos.patient;

import org.youcode.trackme.dtos.bracelet.EmbeddableBraceletResponseDTO;
import org.youcode.trackme.dtos.user.EmbeddableUserResponseDTO;

import java.time.LocalDateTime;
import java.util.Date;

public record PatientResponseDTO(
        Long id,
        String username,
        Date dateOfBirth,
        int age,
        EmbeddableBraceletResponseDTO bracelet,
        EmbeddableUserResponseDTO caregiver,
        LocalDateTime dateCreation
) {}