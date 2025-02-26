package org.youcode.trackme.security.dtos.AuthDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseLoginDTO {

    private String email;
    private String role;
    private String token;
}
