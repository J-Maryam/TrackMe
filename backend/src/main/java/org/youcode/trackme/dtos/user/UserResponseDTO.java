package org.youcode.trackme.dtos.user;

import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.enums.Role;

import java.util.List;

public record UserResponseDTO(
        Long id,
        String username,
        String email,
        String phoneNumber,
        Role role,
        List<PatientResponseDTO> patients
) {
}
