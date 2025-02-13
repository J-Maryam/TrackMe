package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.mappers.BraceletMapper;
import org.youcode.trackme.repositories.BraceletRepository;
import org.youcode.trackme.services.BraceletService;

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
}
