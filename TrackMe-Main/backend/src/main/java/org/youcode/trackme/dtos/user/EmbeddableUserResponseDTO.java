package org.youcode.trackme.dtos.user;

import org.youcode.trackme.security.dtos.AppRoleDTO.EmbeddableAppRoleDTO;

public record EmbeddableUserResponseDTO(
        Long id,
        String username,
        String email,
        String address,
        String phoneNumber,
        EmbeddableAppRoleDTO role
//        List<EmbeddablePatientResponseDTO> patients
) {
}
