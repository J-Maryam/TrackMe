package org.youcode.trackme.dtos.alert;

import org.youcode.trackme.dtos.bracelet.EmbeddableBraceletResponseDTO;
import org.youcode.trackme.entities.enums.AlertStatus;

import java.time.LocalDateTime;

public record AlertDTO(
        Long id,
        String message,
        LocalDateTime timestamp,
        AlertStatus status,
        EmbeddableBraceletResponseDTO bracelet
) {}