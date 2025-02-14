package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.entities.User;
import org.youcode.trackme.mappers.PatientMapper;
import org.youcode.trackme.repositories.BraceletRepository;
import org.youcode.trackme.repositories.PatientRepository;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.services.PatientService;

import java.time.LocalDateTime;

@Service
@Transactional
@Validated
public class PatientServiceImpl extends GenericServiceImpl<Patient, Long, PatientRequestDTO, PatientResponseDTO> implements PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final BraceletRepository braceletRepository;
    private final UserRepository userRepository;

    public PatientServiceImpl(PatientRepository repository, PatientMapper mapper, BraceletRepository braceletRepository, UserRepository userRepository) {
        super(repository, mapper);
        this.patientRepository = repository;
        this.patientMapper = mapper;
        this.braceletRepository = braceletRepository;
        this.userRepository = userRepository;
    }

    @Override
    public PatientResponseDTO create(PatientRequestDTO requestDto) {
        Patient patient = new Patient();
        patient.setUsername(requestDto.username());
        patient.setDateOfBirth(requestDto.dateOfBirth());
        patient.setDateCreation(LocalDateTime.now());

        if (requestDto.braceletId() != null) {
            Bracelet bracelet = braceletRepository.findById(requestDto.braceletId())
                    .orElseThrow(() -> new RuntimeException("Bracelet non trouvé avec l'ID : " + requestDto.braceletId()));
            patient.setBracelet(bracelet);
        }

        if (requestDto.caregiverId() != null) {
            User caregiver = userRepository.findById(requestDto.caregiverId())
                    .orElseThrow(() -> new RuntimeException("Soignant non trouvé avec l'ID : " + requestDto.caregiverId()));
            patient.setCaregiver(caregiver);
        }

        Patient savedPatient = patientRepository.save(patient);
        return patientMapper.toDto(savedPatient);
    }
}
