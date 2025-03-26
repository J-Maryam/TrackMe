package org.youcode.trackme.dtos.user;

import org.youcode.trackme.dtos.patient.EmbeddablePatientResponseDTO;
import org.youcode.trackme.security.dtos.AppRoleDTO.EmbeddableAppRoleDTO;

import java.util.List;

public record UserResponseDTO(
        Long id,
        String username,
        String email,
        String address,
        String phoneNumber,
        EmbeddableAppRoleDTO role,
        List<EmbeddablePatientResponseDTO> patients
        ) {
}
