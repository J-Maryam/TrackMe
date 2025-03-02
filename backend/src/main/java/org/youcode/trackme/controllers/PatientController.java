package org.youcode.trackme.controllers;

import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.ApiResponse;
import org.youcode.trackme.common.PagedResponse;
import org.youcode.trackme.common.controllers.GenericControllerImpl;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.security.dtos.AppUserDTO.CreateAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.ResponseAppUserDTO;
import org.youcode.trackme.services.PatientService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientController extends GenericControllerImpl<Patient, Long, PatientRequestDTO, PatientResponseDTO> {
    public PatientController(PatientService service) {
        super(service);
    }

    @PostMapping("/public/patients")
    public ResponseEntity<PatientResponseDTO> createPatient(@Valid @RequestBody PatientRequestDTO patientRequestDTO) {
        PatientResponseDTO patient = service.create(patientRequestDTO);
        return new ResponseEntity<>(patient, HttpStatus.CREATED);
    }

    @GetMapping("/public/patients")
    public ResponseEntity<ApiResponse<PagedResponse<PatientResponseDTO>>> getAll(Pageable pageable) {
        PagedResponse<PatientResponseDTO> patients = service.getAll(pageable);
        System.out.println("patients: " + patients);
        return ResponseEntity.ok(ApiResponse.success(patients, "Data retrieved successfully"));
    }
}
