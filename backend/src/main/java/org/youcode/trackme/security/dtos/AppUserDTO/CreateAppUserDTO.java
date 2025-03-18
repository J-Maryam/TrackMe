package org.youcode.trackme.security.dtos.AppUserDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAppUserDTO {

    @NotBlank(message = "Username is mandatory")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Address is mandatory")
    @Size(min = 3, max = 100, message = "Address must be at least 6 characters long")
    private String address;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Phone number is mandatory")
    @Pattern(regexp = "^\\+\\d{3}\\s\\d{3}\\s\\d{3}\\s\\d{3}$", message = "Le numéro de téléphone doit être au format +XXX XXX XXX XXX, ex. +212 788 788 788")
    private String phoneNumber;

    private Long roleId = 2L;
}
