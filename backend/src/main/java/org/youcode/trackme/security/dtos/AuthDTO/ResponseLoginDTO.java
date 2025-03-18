package org.youcode.trackme.security.dtos.AuthDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.youcode.trackme.security.dtos.AppRoleDTO.EmbeddableAppRoleDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseLoginDTO {

    private String email;
    private String role;
    private Long id;
    private String token;

    private String username;
    private String address;
    private String phoneNumber;

    private boolean enabled;

}
