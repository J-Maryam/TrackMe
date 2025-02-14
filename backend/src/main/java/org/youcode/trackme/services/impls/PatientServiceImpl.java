package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.mappers.PatientMapper;
import org.youcode.trackme.repositories.PatientRepository;
import org.youcode.trackme.services.PatientService;

@Service
@Transactional
@Validated
public class PatientServiceImpl extends GenericServiceImpl<Patient, Long, PatientRequestDTO, PatientResponseDTO> implements PatientService {
    public PatientServiceImpl(PatientRepository repository, PatientMapper mapper) {
        super(repository, mapper);
    }
}
