package org.youcode.trackme.dtos.patient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;

public record PatientRequestDTO(
        @NotBlank(message = "Le nom d'utilisateur est obligatoire")
        String username,

        @Past(message = "La date de naissance doit être dans le passé")
        @NotNull(message = "La date de naissance est obligatoire")
        LocalDate dateOfBirth,

        Long braceletId,
        Long caregiverId
) {
}
