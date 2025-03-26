package org.youcode.trackme.security.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.youcode.trackme.security.dtos.AppRoleDTO.EmbeddableAppRoleDTO;
import org.youcode.trackme.security.services.implementations.AppRoleService;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api")
public class AppRoleController {

    @Autowired
    private AppRoleService appRoleService;

    @GetMapping("/admin/roles")
    public ResponseEntity<List<EmbeddableAppRoleDTO>> getAllRoles() {
        return ResponseEntity.ok(appRoleService.getAllRoles());
    }
}
