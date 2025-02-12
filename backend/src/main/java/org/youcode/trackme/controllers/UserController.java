package org.youcode.trackme.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.youcode.trackme.common.controllers.GenericControllerImpl;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.entities.User;
import org.youcode.trackme.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController extends GenericControllerImpl<User, Long, UserRequestDTO, UserResponseDTO> {
    public UserController(UserService service) {
        super(service);
    }
}
