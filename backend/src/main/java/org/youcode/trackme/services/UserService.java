package org.youcode.trackme.services;

import org.youcode.trackme.common.services.GenericService;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.security.entities.AppUser;

public interface UserService extends GenericService<AppUser, Long, UserRequestDTO, UserResponseDTO> {
    boolean checkEmailExists(String email);
}
