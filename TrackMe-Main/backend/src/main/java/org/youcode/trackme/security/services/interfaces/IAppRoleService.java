package org.youcode.trackme.security.services.interfaces;


import org.youcode.trackme.security.dtos.AppRoleDTO.EmbeddableAppRoleDTO;

import java.util.List;

public interface IAppRoleService {
    List<EmbeddableAppRoleDTO> getAllRoles();
}
