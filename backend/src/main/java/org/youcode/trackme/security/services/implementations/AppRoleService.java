package org.youcode.trackme.security.services.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.youcode.trackme.security.dtos.AppRoleDTO.EmbeddableAppRoleDTO;
import org.youcode.trackme.security.entities.AppRole;
import org.youcode.trackme.security.repositories.AppRoleRepository;
import org.youcode.trackme.security.services.interfaces.IAppRoleService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppRoleService implements IAppRoleService {

    private final AppRoleRepository appRoleRepository;

    @Override
    public List<EmbeddableAppRoleDTO> getAllRoles() {
        List<AppRole> roles = appRoleRepository.findAll();
        return roles.stream().map(role -> new EmbeddableAppRoleDTO(role.getRoleName())).toList();
    }
}
