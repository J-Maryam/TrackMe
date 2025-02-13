package org.youcode.trackme.services;

import org.youcode.trackme.common.services.GenericService;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.entities.Bracelet;

public interface BraceletService extends GenericService<Bracelet, Long, BraceletRequestDTO, BraceletResponseDTO> {
}
