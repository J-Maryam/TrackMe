package org.youcode.trackme.dtos.bracelet;

import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.entities.enums.BraceletState;
import org.youcode.trackme.entities.enums.BraceletStatus;

public record BraceletResponseDTO(
        Long id,
        String serialNumber,
        BraceletStatus status,
        String color,
        Patient patient
) {}
