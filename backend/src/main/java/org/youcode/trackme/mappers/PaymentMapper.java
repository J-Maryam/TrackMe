package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.youcode.trackme.common.Mapper.GenericMapper;
import org.youcode.trackme.dtos.payment.PaymentRequestDTO;
import org.youcode.trackme.dtos.payment.PaymentResponseDTO;
import org.youcode.trackme.entities.Payment;

@Mapper(componentModel = "spring")
public interface PaymentMapper extends GenericMapper<Payment, PaymentRequestDTO, PaymentResponseDTO> {
}
