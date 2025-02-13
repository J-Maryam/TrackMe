package org.youcode.trackme.dtos.patient;

import org.youcode.trackme.entities.enums.DiseaseStage;

import java.util.Date;

public record PatientRequestDTO(
        String username,
        Date dateOfBirth,
        DiseaseStage diseaseStage,
        Long braceletId,
        Long caregiverId,
        Long geofenceId
) {}