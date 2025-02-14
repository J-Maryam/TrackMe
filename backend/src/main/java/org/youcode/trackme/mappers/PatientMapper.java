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
import java.util.Date;

@Mapper(componentModel = "spring")
public interface PatientMapper extends GenericMapper<Patient, PatientRequestDTO, PatientResponseDTO> {
    @Mapping(target = "age", source = "dateOfBirth", qualifiedByName = "calculateAge")
    PatientResponseDTO toDto(Patient patient);

    @Named("calculateAge")
    default int calculateAge(Date dateOfBirth) {
        if (dateOfBirth == null) return 0;
        LocalDate birthDate = new java.sql.Date(dateOfBirth.getTime()).toLocalDate();
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
}
