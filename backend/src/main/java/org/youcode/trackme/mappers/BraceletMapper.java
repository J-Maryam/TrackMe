package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.youcode.trackme.common.Mapper.GenericMapper;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.entities.Bracelet;

@Mapper(componentModel = "spring")
public interface BraceletMapper extends GenericMapper<Bracelet, BraceletRequestDTO, BraceletResponseDTO> {
}
