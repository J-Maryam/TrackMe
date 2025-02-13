package org.youcode.trackme.dtos.bracelet;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.youcode.trackme.entities.enums.BraceletState;
import org.youcode.trackme.entities.enums.BraceletStatus;

public record BraceletRequestDTO(
        @NotBlank(message = "Serial number is mandatory")
        String serialNumber,

        @NotNull(message = "Status is mandatory")
        BraceletStatus status,

        @NotNull(message = "State is mandatory")
        BraceletState state
) {
}
