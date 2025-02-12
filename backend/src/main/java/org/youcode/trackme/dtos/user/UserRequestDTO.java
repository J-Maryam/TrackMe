package org.youcode.trackme.dtos.user;

import jakarta.validation.constraints.*;
import org.youcode.trackme.entities.enums.Role;

public record UserRequestDTO(

        @NotBlank(message = "Username is mandatory")
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        String username,

        @NotBlank(message = "Password is mandatory")
        @Size(min = 6, max = 100, message = "Password must be at least 6 characters long")
        String password,

        @NotBlank(message = "Email is mandatory")
        @Email(message = "Email should be valid")
        String email,

        @NotNull
        String phoneNumber,

        Role role
) {
}
