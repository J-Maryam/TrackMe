package org.youcode.trackme.dtos.user;

import org.youcode.trackme.security.entities.AppRole;

public record EmbeddableUserResponseDTO(
        Long id,
        String username,
        String email,
        String phoneNumber,
        AppRole role
) {
}
