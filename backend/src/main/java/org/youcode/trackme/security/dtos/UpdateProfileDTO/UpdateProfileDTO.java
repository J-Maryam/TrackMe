package org.youcode.trackme.security.dtos.UpdateProfileDTO;

import jakarta.validation.constraints.NotBlank;

public record UpdateProfileDTO(
        @NotBlank String phoneNumber,
        @NotBlank String address
) {}