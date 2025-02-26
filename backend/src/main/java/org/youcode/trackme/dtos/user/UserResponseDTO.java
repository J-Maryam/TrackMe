package org.youcode.trackme.dtos.user;

import org.youcode.trackme.dtos.patient.EmbeddablePatientResponseDTO;
import org.youcode.trackme.security.entities.AppRole;

import java.util.List;

public record UserResponseDTO(
        Long id,
        String username,
        String email,
        String phoneNumber,
        AppRole role,
        List<EmbeddablePatientResponseDTO> patients
) {
}
