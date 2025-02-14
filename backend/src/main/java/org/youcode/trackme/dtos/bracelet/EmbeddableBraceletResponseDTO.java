package org.youcode.trackme.dtos.bracelet;

import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.entities.enums.BraceletStatus;

public record EmbeddableBraceletResponseDTO(
        Long id,
        String serialNumber,
        BraceletStatus status,
        String color
//        PatientResponseDTO patient
) {}
