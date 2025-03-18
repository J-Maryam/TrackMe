package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.entities.enums.BraceletState;
import org.youcode.trackme.entities.enums.BraceletStatus;
import org.youcode.trackme.mappers.BraceletMapper;
import org.youcode.trackme.repositories.BraceletRepository;
import org.youcode.trackme.repositories.PatientRepository;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.services.BraceletService;
import org.youcode.trackme.services.PatientService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@Validated
public class BraceletServiceImpl extends GenericServiceImpl<Bracelet, Long, BraceletRequestDTO, BraceletResponseDTO> implements BraceletService {

    private final BraceletRepository braceletRepository;
    private final BraceletMapper braceletMapper;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public BraceletServiceImpl(BraceletRepository repository, BraceletMapper mapper, PatientRepository patientRepository, UserRepository userRepository) {
        super(repository, mapper);
        this.braceletRepository = repository;
        this.braceletMapper = mapper;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BraceletResponseDTO create(BraceletRequestDTO requestDto) {
        Patient existingPatient = patientRepository.findById(requestDto.patientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with Id " + requestDto.patientId()));

        String serialNumber = generateSerialNumber();

        Bracelet bracelet = new Bracelet();
        bracelet.setSerialNumber(serialNumber);
        bracelet.setStatus(BraceletStatus.INACTIVE);
        bracelet.setColor(requestDto.color());
        bracelet.setPatient(existingPatient);

        Bracelet savedBracelet = braceletRepository.save(bracelet);

        return braceletMapper.toDto(savedBracelet);
    }

    @Override
    public BraceletResponseDTO update(Long id, BraceletRequestDTO requestDto) {
        Bracelet bracelet = braceletRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bracelet non trouvé avec l'ID : " + id));

        Patient existingPatient = patientRepository.findById(requestDto.patientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with Id " + requestDto.patientId()));

        bracelet.setStatus(requestDto.status());
        bracelet.setColor(requestDto.color());
        bracelet.setPatient(existingPatient);

        Bracelet updatedBracelet = braceletRepository.save(bracelet);

        return braceletMapper.toDto(updatedBracelet);
    }

    /**
     * Méthode pour générer un numéro de série unique au format BRAC-XXXXXX
     */
    private String generateSerialNumber() {
        String randomPart = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "BRAC-" + randomPart;
    }

    @Override
    public List<BraceletResponseDTO> getBraceletsByClientId(Long clientId) {
        if (!userRepository.existsById(clientId)) {
            throw new EntityNotFoundException("Client with ID " + clientId + " not found.");
        }

        List<Bracelet> bracelets = braceletRepository.findByPatientUserClientId(clientId);

        if (bracelets.isEmpty()) {
            throw new EntityNotFoundException("No bracelets found for client with ID " + clientId);
        }

        return bracelets.stream()
                .map(braceletMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void activateBracelet(Long id) {
        Bracelet bracelet = braceletRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bracelet with id " + id + " not found"));
        bracelet.setStatus(BraceletStatus.ACTIVE);
        braceletRepository.save(bracelet);
    }

    @Override
    public void deactivateBracelet(Long id) {
        Bracelet bracelet = braceletRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bracelet with id " + id + " not found"));
        bracelet.setStatus(BraceletStatus.INACTIVE);
        braceletRepository.save(bracelet);
    }
}
