package org.youcode.trackme.dtos.patient;

import org.youcode.trackme.entities.enums.DiseaseStage;

import java.time.LocalDateTime;
import java.util.Date;

public record PatientResponseDTO(
        Long id,
        String username,
        Date dateOfBirth,
        int age,
        DiseaseStage diseaseStage,
        Long braceletId,
        Long caregiverId,
        Long geofenceId,
        LocalDateTime dateCreation
) {}