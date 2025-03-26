package org.youcode.trackme.services;

import org.youcode.trackme.common.services.GenericService;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.entities.Bracelet;

import java.util.List;

public interface BraceletService extends GenericService<Bracelet, Long, BraceletRequestDTO, BraceletResponseDTO> {
    List<BraceletResponseDTO> getBraceletsByClientId(Long clientId);
    void activateBracelet(Long id);
    void deactivateBracelet(Long id);
}
