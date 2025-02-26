package org.youcode.trackme.security.dtos.PasswordDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {

    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;
}
