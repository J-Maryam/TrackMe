package org.youcode.trackme.security.mappers.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.youcode.trackme.security.entities.AppRole;
import org.youcode.trackme.security.repositories.AppRoleRepository;

@Component
public class AppRoleMapperHelper {

    @Autowired
    private AppRoleRepository appRoleRepository;

    public AppRole mapAppRoleIdToAppRole(Long appRoleId) {
        return appRoleRepository.findById(appRoleId).orElse(null);
    }
}

