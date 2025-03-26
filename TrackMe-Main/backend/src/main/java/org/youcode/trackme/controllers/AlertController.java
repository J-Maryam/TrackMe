package org.youcode.trackme.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.youcode.trackme.dtos.alert.AlertDTO;
import org.youcode.trackme.services.AlertService;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public ResponseEntity<List<AlertDTO>> getAllAlerts() {
        return ResponseEntity.ok(alertService.getAllAlerts());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AlertDTO>> getAlertsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(alertService.getAlertsByStatus(status));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<AlertDTO>> getAlertsByType(@PathVariable String type) {
        return ResponseEntity.ok(alertService.getAlertsByType(type));
    }

    @GetMapping("/bracelet/{braceletId}")
    public ResponseEntity<List<AlertDTO>> getAlertsByBraceletId(@PathVariable Long braceletId) {
        return ResponseEntity.ok(alertService.getAlertsByBraceletId(braceletId));
    }
}
