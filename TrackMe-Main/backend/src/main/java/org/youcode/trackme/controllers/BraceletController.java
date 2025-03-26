package org.youcode.trackme.controllers;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.ApiResponse;
import org.youcode.trackme.common.PagedResponse;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.security.entities.AppUser;
import org.youcode.trackme.services.BraceletService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class BraceletController {

    private final BraceletService braceletService;
    private final UserRepository userRepository;

    public BraceletController(BraceletService braceletService, UserRepository userRepository) {
        this.braceletService = braceletService;
        this.userRepository = userRepository;
    }

    // --- Opérations publiques ---

    @GetMapping("/public/bracelets/{id}")
    public ResponseEntity<BraceletResponseDTO> getBraceletById(@PathVariable Long id) {
        BraceletResponseDTO bracelet = braceletService.getById(id);
        return ResponseEntity.ok(bracelet);
    }

    @PostMapping("/public/bracelets")
    public ResponseEntity<BraceletResponseDTO> createBracelet(@RequestBody BraceletRequestDTO requestDTO) {
        BraceletResponseDTO createdBracelet = braceletService.create(requestDTO);
        return new ResponseEntity<>(createdBracelet, HttpStatus.CREATED);
    }

    @PutMapping("/public/bracelets/{id}")
    public ResponseEntity<BraceletResponseDTO> updateBracelet(@PathVariable Long id, @RequestBody BraceletRequestDTO requestDTO) {
        BraceletResponseDTO updatedBracelet = braceletService.update(id, requestDTO);
        return ResponseEntity.ok(updatedBracelet);
    }

//    @DeleteMapping("/public/bracelets/{id}")
//    public ResponseEntity<Void> deleteBracelet(@PathVariable Long id) {
//        braceletService.delete(id);
//        return ResponseEntity.noContent().build();
//    }

    @GetMapping("/public/bracelets/me")
    public ResponseEntity<List<BraceletResponseDTO>> getCurrentClientBracelets(Authentication authentication) {
        String email = authentication.getName();
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email " + email + " not found"));
        List<BraceletResponseDTO> bracelets = braceletService.getBraceletsByClientId(user.getId());
        return ResponseEntity.ok(bracelets);
    }

    // --- Opérations admin ---

    @GetMapping("/admin/bracelets")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PagedResponse<BraceletResponseDTO>>> getAll(Pageable pageable) {
        PagedResponse<BraceletResponseDTO> response = braceletService.getAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(response, "Data retrieved successfully"));
    }

    @PutMapping("/admin/bracelets/{id}/activate")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> activateBracelet(@PathVariable Long id) {
        braceletService.activateBracelet(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/admin/bracelets/{id}/deactivate")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deactivateBracelet(@PathVariable Long id) {
        braceletService.deactivateBracelet(id);
        return ResponseEntity.noContent().build();
    }
}