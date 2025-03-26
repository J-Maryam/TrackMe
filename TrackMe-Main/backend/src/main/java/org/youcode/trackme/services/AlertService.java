package org.youcode.trackme.services;

import org.youcode.trackme.dtos.alert.AlertDTO;

import java.util.List;

public interface AlertService {
    List<AlertDTO> getAllAlerts();
    List<AlertDTO> getAlertsByStatus(String status);
    List<AlertDTO> getAlertsByType(String type);
    List<AlertDTO> getAlertsByBraceletId(Long braceletId);
}
