package org.youcode.trackme.security.dtos.AuthDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestLoginDTO {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
