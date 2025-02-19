package org.youcode.trackme.dtos.user;

import org.youcode.trackme.entities.Role;

public record EmbeddableUserResponseDTO(
        Long id,
        String username,
        String email,
        String phoneNumber,
        Role role
) {
}
