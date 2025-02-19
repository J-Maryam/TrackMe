package org.youcode.trackme.dtos.user;

import org.youcode.trackme.dtos.patient.EmbeddablePatientResponseDTO;
import org.youcode.trackme.entities.Role;

import java.util.List;

public record UserResponseDTO(
        Long id,
        String username,
        String email,
        String phoneNumber,
        Role role,
        List<EmbeddablePatientResponseDTO> patients
) {
}
