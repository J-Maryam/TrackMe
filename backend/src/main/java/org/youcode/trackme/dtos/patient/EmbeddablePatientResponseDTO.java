package org.youcode.trackme.dtos.patient;

import java.time.LocalDateTime;
import java.util.Date;

public record EmbeddablePatientResponseDTO(
        Long id,
        String username,
        Date dateOfBirth,
        int age,
        LocalDateTime dateCreation
) {}