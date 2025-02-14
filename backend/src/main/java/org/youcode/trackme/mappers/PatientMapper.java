package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.youcode.trackme.common.Mapper.GenericMapper;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;

@Mapper(componentModel = "spring")
public interface PatientMapper extends GenericMapper<Patient, PatientRequestDTO, PatientResponseDTO> {
}
