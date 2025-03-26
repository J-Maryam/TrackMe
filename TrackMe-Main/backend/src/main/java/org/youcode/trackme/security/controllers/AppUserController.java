package org.youcode.trackme.security.controllers;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.security.dtos.AppUserDTO.CreateAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.ResponseAppUserDTO;
import org.youcode.trackme.security.dtos.AuthDTO.RequestLoginDTO;
import org.youcode.trackme.security.dtos.AuthDTO.ResponseLoginDTO;
import org.youcode.trackme.security.dtos.PasswordDTO.ChangePasswordDTO;
import org.youcode.trackme.security.dtos.UpdateProfileDTO.UpdateProfileDTO;
import org.youcode.trackme.security.services.interfaces.IAppUserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Validated
@RestController
@RequestMapping("/api")
public class AppUserController {

    @Autowired
    private IAppUserService appUserService;

    @PostMapping("/public/register")
    public ResponseEntity<ResponseAppUserDTO> createAppUser(@Valid @RequestBody CreateAppUserDTO createAppUserDTO) {
        ResponseAppUserDTO appUser = appUserService.create(createAppUserDTO);
        return new ResponseEntity<>(appUser, HttpStatus.OK);
    }

    @PostMapping("/public/login")
    public ResponseEntity<ResponseLoginDTO> createAppUser(@Valid @RequestBody RequestLoginDTO requestLoginDTO) {
        ResponseLoginDTO login = appUserService.login(requestLoginDTO);
        return new ResponseEntity<>(login, HttpStatus.OK);
    }


    @GetMapping("/admin/users/{username}")
    public ResponseEntity<ResponseAppUserDTO> getAppUserByUsername( @PathVariable("username") String username) {
        ResponseAppUserDTO user = appUserService.getByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<ResponseAppUserDTO>> getAllUsers() {
        List<ResponseAppUserDTO> users = appUserService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

//    @DeleteMapping("/admin/users/{username}")
//    public ResponseEntity<String> deleteUser(@PathVariable("username") String username) {
//        appUserService.deleteUser(username);
//        return new ResponseEntity<>("Utilisateur est supprimé avec succès", HttpStatus.OK);
//    }

    @PutMapping("/admin/users/{id}/disable")
    public ResponseEntity<Void> disableUser(@PathVariable Long id) {
        appUserService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/admin/users/{id}/enable")
    public ResponseEntity<Void> enableUser(@PathVariable Long id) {
        appUserService.enableUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResponseAppUserDTO> getCurrentUser() {
        ResponseAppUserDTO user = appUserService.getCurrentUser();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updateProfile(@Valid @RequestBody UpdateProfileDTO updateProfileDTO) {
        try {
            ResponseAppUserDTO updatedUser = appUserService.updateProfile(updateProfileDTO);
            return ResponseEntity.ok(Map.of("user", updatedUser));
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errors", Map.of("general", e.getMessage()));
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/updatePassword")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updatePassword(@Valid @RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            appUserService.changePassword(changePasswordDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Mot de passe changé avec succès.");
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            Map<String, String> errors = new HashMap<>();
            if (e.getMessage().contains("identique")) {
                errors.put("newPassword", e.getMessage());
            } else if (e.getMessage().contains("incorrect")) {
                errors.put("oldPassword", e.getMessage());
            } else {
                errors.put("general", e.getMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errors", Map.of("general", e.getMessage()));
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/validateOldPassword")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> validateOldPassword(@RequestBody Map<String, String> request) {
        String oldPassword = request.get("oldPassword");
        try {
            appUserService.validateOldPassword(oldPassword);
            return ResponseEntity.ok(Map.of("valid", true));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(Map.of("errors", Map.of("oldPassword", e.getMessage())));
        }
    }
}

