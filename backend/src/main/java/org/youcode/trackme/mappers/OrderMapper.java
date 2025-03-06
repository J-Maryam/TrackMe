package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.youcode.trackme.dtos.order.OrderRequestDTO;
import org.youcode.trackme.dtos.order.OrderResponseDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.entities.Order;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.security.entities.AppUser;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    AppUser toAppUser(OrderRequestDTO dto);

    // Mapper Patient
    @Mapping(target = "caregiver", ignore = true)
    @Mapping(source = "patientName", target = "username")
    @Mapping(source = "dateOfBirth", target = "dateOfBirth")
    @Mapping(source = "patientAge", target = "age")
    Patient toPatient(OrderRequestDTO dto);

    // Mapper Bracelet
    @Mapping(target = "patient", ignore = true)
    @Mapping(source = "braceletColor", target = "color")
    Bracelet toBracelet(OrderRequestDTO dto);

    // Mapper Order
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "bracelet", ignore = true)
    @Mapping(target = "payment", ignore = true)
    Order toOrder(OrderRequestDTO dto);

    OrderResponseDTO toOrderResponseDTO(Order order);
}