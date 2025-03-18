package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.youcode.trackme.entities.Bracelet;

import java.util.List;

@Repository
public interface BraceletRepository extends JpaRepository<Bracelet, Long> {
    @Query("SELECT b FROM Bracelet b WHERE b.patient.caregiver.id = :clientId")
    List<Bracelet> findByPatientUserClientId(@Param("clientId") Long clientId);
}
