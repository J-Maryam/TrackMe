package org.youcode.trackme.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.ApiResponse;
import org.youcode.trackme.dtos.AdminStatsDTO.AdminStatsDTO;
import org.youcode.trackme.services.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<AdminStatsDTO>> getStats() {
        AdminStatsDTO stats = adminService.getStats();
        return ResponseEntity.ok(ApiResponse.success(stats, "Stats retrieved successfully"));
    }
}