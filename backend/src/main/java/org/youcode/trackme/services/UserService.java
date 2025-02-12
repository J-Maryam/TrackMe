package org.youcode.trackme.services;

import org.springframework.stereotype.Service;
import org.youcode.trackme.common.services.GenericService;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.entities.User;

@Service
public interface UserService extends GenericService<User, Long, UserRequestDTO, UserResponseDTO> {
}
