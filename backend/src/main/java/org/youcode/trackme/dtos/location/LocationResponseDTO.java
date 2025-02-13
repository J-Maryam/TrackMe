package org.youcode.trackme.dtos.location;

import org.youcode.trackme.entities.Bracelet;

import java.time.LocalDateTime;

public record LocationResponseDTO(
        Long id,
        Double latitude,
        Double longitude,
        LocalDateTime timestamp,
        Bracelet bracelet
) {}