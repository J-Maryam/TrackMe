package org.youcode.trackme.services.impls;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.patient.PatientRequestDTO;
import org.youcode.trackme.dtos.patient.PatientResponseDTO;
import org.youcode.trackme.entities.Patient;
import org.youcode.trackme.mappers.PatientMapper;
import org.youcode.trackme.repositories.PatientRepository;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.security.entities.AppUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientServiceImplTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private PatientMapper patientMapper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PatientServiceImpl patientService;

    private PatientRequestDTO patientRequestDTO;
    private Patient patient;
    private PatientResponseDTO patientResponseDTO;
    private AppUser caregiver;

    @BeforeEach
    void setUp() {
        patientRequestDTO = new PatientRequestDTO(
                "john_doe",
                LocalDate.of(1990, 1, 1),
                1L
        );

        patient = new Patient();
        patient.setId(1L);
        patient.setUsername("john_doe");
        patient.setDateOfBirth(LocalDate.of(1990, 1, 1));
        patient.setDateCreation(LocalDateTime.now());

        patientResponseDTO = new PatientResponseDTO(
                1L,
                "john_doe",
                LocalDate.of(1990, 1, 1),
                43,
                null,
                null
        );

        caregiver = new AppUser();
        caregiver.setId(1L);
        caregiver.setUsername("caregiver1");
    }

    @Test
    void createPatient_WithValidData_ShouldReturnPatientResponseDTO() {
        when(patientMapper.toDto(any(Patient.class))).thenReturn(patientResponseDTO);
        when(userRepository.findById(1L)).thenReturn(Optional.of(caregiver));
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);

        PatientResponseDTO result = patientService.create(patientRequestDTO);

        assertNotNull(result);
        assertEquals("john_doe", result.username());
        assertEquals(LocalDate.of(1990, 1, 1), result.dateOfBirth());
        verify(patientRepository, times(1)).save(any(Patient.class));
        verify(patientMapper, times(1)).toDto(any(Patient.class));
    }

    @Test
    void createPatient_WithoutCaregiver_ShouldReturnPatientResponseDTO() {
        PatientRequestDTO requestWithoutCaregiver = new PatientRequestDTO(
                "john_doe",
                LocalDate.of(1990, 1, 1),
                null
        );

        when(patientMapper.toDto(any(Patient.class))).thenReturn(patientResponseDTO);
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);

        PatientResponseDTO result = patientService.create(requestWithoutCaregiver);

        assertNotNull(result);
        assertNull(patient.getCaregiver());
        verify(userRepository, never()).findById(any());
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    void createPatient_WithNonExistentCaregiver_ShouldThrowException() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        PatientRequestDTO invalidRequest = new PatientRequestDTO(
                "john_doe",
                LocalDate.of(1990, 1, 1),
                99L
        );

        assertThrows(EntityNotFoundException.class, () -> patientService.create(invalidRequest));
        verify(userRepository, times(1)).findById(99L);
        verify(patientRepository, never()).save(any());
    }

    @Test
    void getPatientById_WhenPatientExists_ShouldReturnPatientResponseDTO() {
        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));
        when(patientMapper.toDto(patient)).thenReturn(patientResponseDTO);

        PatientResponseDTO result = patientService.getById(1L);

        assertNotNull(result);
        assertEquals(1L, result.id());
        verify(patientRepository, times(1)).findById(1L);
    }

    @Test
    void getPatientById_WhenPatientNotExists_ShouldThrowException() {
        when(patientRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> patientService.getById(99L));
        verify(patientRepository, times(1)).findById(99L);
    }

    @Test
    void updatePatient_WhenPatientExists_ShouldReturnUpdatedPatient() {
        PatientRequestDTO updateRequest = new PatientRequestDTO(
                "updated_username",
                LocalDate.of(1995, 1, 1),
                1L
        );

        Patient updatedPatient = new Patient();
        updatedPatient.setId(1L);
        updatedPatient.setUsername("updated_username");
        updatedPatient.setDateOfBirth(LocalDate.of(1995, 1, 1));

        PatientResponseDTO updatedResponse = new PatientResponseDTO(
                1L,
                "updated_username",
                LocalDate.of(1995, 1, 1),
                43,
                null,
                null
        );

        when(patientRepository.existsById(1L)).thenReturn(true);
        when(patientMapper.toEntity(updateRequest)).thenReturn(updatedPatient);
        when(patientRepository.save(updatedPatient)).thenReturn(updatedPatient);
        when(patientMapper.toDto(updatedPatient)).thenReturn(updatedResponse);

        PatientResponseDTO result = patientService.update(1L, updateRequest);

        assertNotNull(result);
        assertEquals("updated_username", result.username());
        assertEquals(LocalDate.of(1995, 1, 1), result.dateOfBirth());
        verify(patientRepository, times(1)).existsById(1L);
        verify(patientRepository, times(1)).save(updatedPatient);
    }

    @Test
    void deletePatient_WhenPatientExists_ShouldDeletePatient() {
        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));

        patientService.delete(1L);

        verify(patientRepository, times(1)).delete(patient);
    }
}