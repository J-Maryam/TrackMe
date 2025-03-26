package org.youcode.trackme.controllers;

import org.springframework.web.bind.annotation.*;
import org.youcode.trackme.common.controllers.GenericControllerImpl;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.services.PatientService;


@RestController
@RequestMapping("/api/public/patients")
@CrossOrigin(origins = "http://localhost:4200")
public class PatientController extends GenericControllerImpl<Patient, Long, PatientRequestDTO, PatientResponseDTO> {
    public PatientController(PatientService service) {
        super(service);
    }
}
