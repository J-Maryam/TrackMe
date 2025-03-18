package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.youcode.trackme.entities.Alert;
import org.youcode.trackme.entities.enums.AlertStatus;
import org.youcode.trackme.entities.enums.AlertType;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByStatus(AlertStatus status);
    List<Alert> findByType(AlertType type);
    List<Alert> findByBraceletId(Long braceletId);
}