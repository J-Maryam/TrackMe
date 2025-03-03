package org.youcode.trackme.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.controllers.GenericControllerImpl;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.security.entities.AppUser;
import org.youcode.trackme.services.UserService;

@RestController
//@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Autorise uniquement cette origine
public class UserController extends GenericControllerImpl<AppUser, Long, UserRequestDTO, UserResponseDTO> {

    private final UserService userService;

    public UserController(UserService service, UserService userService) {
        super(service);
        this.userService = userService;
    }

    @GetMapping("/api/public/users/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = userService.checkEmailExists(email);
        return ResponseEntity.ok(exists);
    }
}
