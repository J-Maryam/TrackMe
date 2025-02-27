package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.youcode.trackme.common.Mapper.GenericMapper;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;

import java.time.LocalDate;
import java.time.Period;

@Mapper(componentModel = "spring")
public interface PatientMapper extends GenericMapper<Patient, PatientRequestDTO, PatientResponseDTO> {
    PatientResponseDTO toDto(Patient patient);
}
