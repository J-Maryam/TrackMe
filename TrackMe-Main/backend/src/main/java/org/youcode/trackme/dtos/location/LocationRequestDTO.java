package org.youcode.trackme.dtos.location;

public record LocationRequestDTO(
        Double latitude,
        Double longitude,
        Long braceletId
) {}