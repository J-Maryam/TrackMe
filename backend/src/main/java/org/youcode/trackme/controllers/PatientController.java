package org.youcode.trackme.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.youcode.trackme.common.controllers.GenericControllerImpl;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.services.PatientService;

@RestController
@RequestMapping("/api/client/patients")
public class PatientController extends GenericControllerImpl<Patient, Long, PatientRequestDTO, PatientResponseDTO> {
    public PatientController(PatientService service) {
        super(service);
    }
}
