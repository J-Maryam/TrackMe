package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.entities.enums.BraceletState;
import org.youcode.trackme.entities.enums.BraceletStatus;
import org.youcode.trackme.mappers.BraceletMapper;
import org.youcode.trackme.repositories.BraceletRepository;
import org.youcode.trackme.services.BraceletService;

import java.util.UUID;

@Service
@Transactional
@Validated
public class BraceletServiceImpl extends GenericServiceImpl<Bracelet, Long, BraceletRequestDTO, BraceletResponseDTO> implements BraceletService {

    private final BraceletRepository braceletRepository;
    private final BraceletMapper braceletMapper;

    public BraceletServiceImpl(BraceletRepository repository, BraceletMapper mapper) {
        super(repository, mapper);
        this.braceletRepository = repository;
        this.braceletMapper = mapper;
    }

    @Override
    public BraceletResponseDTO create(BraceletRequestDTO requestDto) {
        String serialNumber = generateSerialNumber();

        Bracelet bracelet = new Bracelet();
        bracelet.setSerialNumber(serialNumber);
        bracelet.setStatus(BraceletStatus.INACTIVE);
        bracelet.setColor(requestDto.color());

        Bracelet savedBracelet = braceletRepository.save(bracelet);

        return braceletMapper.toDto(savedBracelet);
    }

    @Override
    public BraceletResponseDTO update(Long id, BraceletRequestDTO requestDto) {
        Bracelet bracelet = braceletRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bracelet non trouvé avec l'ID : " + id));

        bracelet.setStatus(requestDto.status());
        bracelet.setColor(requestDto.color());

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
}
