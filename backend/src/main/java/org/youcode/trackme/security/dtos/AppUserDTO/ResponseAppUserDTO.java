package org.youcode.trackme.security.dtos.AppUserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.youcode.trackme.security.dtos.AppRoleDTO.EmbeddableAppRoleDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseAppUserDTO {

    private Long id;

    private String username;

    private String email;
    private String address;
    private String phoneNumber;

    private EmbeddableAppRoleDTO role;
    private boolean enabled;

}
