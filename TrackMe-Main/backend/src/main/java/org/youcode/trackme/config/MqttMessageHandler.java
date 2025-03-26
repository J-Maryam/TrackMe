package org.youcode.trackme.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;
import org.youcode.trackme.entities.GpsLocation;
import org.youcode.trackme.services.impls.LocationService;

import java.time.LocalDateTime;

@Component
@Slf4j
public class MqttMessageHandler {

    @Autowired
    private LocationService locationService;

    private final ObjectMapper mapper = new ObjectMapper();

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(Message<?> message) {
        try {
            String payload = message.getPayload().toString();
            log.info("Données GPS reçues: {}", payload);

            // Parser le JSON
            JsonNode jsonNode = mapper.readTree(payload);

            GpsLocation location = new GpsLocation();
            location.setLatitude(jsonNode.get("latitude").asDouble());
            location.setLongitude(jsonNode.get("longitude").asDouble());
            location.setSatellites(jsonNode.get("satellites").asInt());
            location.setDeviceId(jsonNode.get("deviceId").asText());
            location.setTimestamp(LocalDateTime.now());

            log.info("Position: {}, {}", location.getLatitude(), location.getLongitude());
            log.info("Satellites: {}", location.getSatellites());
            log.info("ID de l'appareil: {}", location.getDeviceId());

            // Mettre à jour le service de localisation
            locationService.updateLocation(location);

        } catch (Exception e) {
            log.error("Erreur lors du traitement du message: {}", e.getMessage(), e);
        }
    }
}
