package org.youcode.trackme.services;

import org.youcode.trackme.common.services.GenericService;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;

public interface PatientService extends GenericService<Patient, Long, PatientRequestDTO, PatientResponseDTO> {
}
