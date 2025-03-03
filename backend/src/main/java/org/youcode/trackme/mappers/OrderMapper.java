package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.youcode.trackme.common.Mapper.GenericMapper;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.entities.Order;

@Mapper(componentModel = "spring")
public interface OrderMapper extends GenericMapper<Order, OrderRequestDTO, OrderResponseDTO> {
}
