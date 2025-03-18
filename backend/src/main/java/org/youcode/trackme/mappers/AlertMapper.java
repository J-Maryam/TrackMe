package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.youcode.trackme.dtos.alert.AlertDTO;
import org.youcode.trackme.entities.Alert;

@Mapper(componentModel = "spring", uses = {BraceletMapper.class})
public interface AlertMapper {
    @Mapping(source = "bracelet", target = "bracelet")
    AlertDTO toDto(Alert alert);

    Alert toEntity(AlertDTO alertDTO);
}