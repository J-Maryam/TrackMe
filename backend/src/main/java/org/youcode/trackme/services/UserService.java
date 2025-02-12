package org.youcode.trackme.services;

import org.youcode.trackme.common.services.GenericService;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.entities.User;

public interface UserService extends GenericService<User, Long, UserRequestDTO, UserResponseDTO> {
}
