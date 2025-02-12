package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.youcode.trackme.entities.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
