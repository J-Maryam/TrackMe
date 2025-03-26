package org.youcode.trackme.dtos.patient;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public record EmbeddablePatientResponseDTO(
        Long id,
        String username,
        LocalDate dateOfBirth,
        int age,
        LocalDateTime dateCreation
) {}