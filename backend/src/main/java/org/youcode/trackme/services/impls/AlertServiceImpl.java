package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.dtos.alert.AlertDTO;
import org.youcode.trackme.entities.enums.AlertStatus;
import org.youcode.trackme.entities.enums.AlertType;
import org.youcode.trackme.mappers.AlertMapper;
import org.youcode.trackme.repositories.AlertRepository;
import org.youcode.trackme.services.AlertService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Validated
public class AlertServiceImpl implements AlertService {
    private final AlertRepository alertRepository;
    private final AlertMapper alertMapper;

    public AlertServiceImpl(AlertRepository alertRepository, AlertMapper alertMapper) {
        this.alertRepository = alertRepository;
        this.alertMapper = alertMapper;
    }

    public List<AlertDTO> getAllAlerts() {
        return alertRepository.findAll().stream()
                .map(alertMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<AlertDTO> getAlertsByStatus(String status) {
        AlertStatus alertStatus = AlertStatus.valueOf(status.toUpperCase());
        return alertRepository.findByStatus(alertStatus).stream()
                .map(alertMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<AlertDTO> getAlertsByType(String type) {
        AlertType alertType = AlertType.valueOf(type.toUpperCase());
        return alertRepository.findByType(alertType).stream()
                .map(alertMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<AlertDTO> getAlertsByBraceletId(Long braceletId) {
        return alertRepository.findByBraceletId(braceletId).stream()
                .map(alertMapper::toDto)
                .collect(Collectors.toList());
    }
}
