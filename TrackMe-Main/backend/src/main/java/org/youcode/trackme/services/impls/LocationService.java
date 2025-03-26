package org.youcode.trackme.services.impls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.youcode.trackme.entities.DeviceLocation;
import org.youcode.trackme.entities.GpsLocation;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LocationService {

    private final Map<String, DeviceLocation> deviceLocations = new ConcurrentHashMap<>();

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void updateLocation(GpsLocation location) {
        DeviceLocation deviceLocation = deviceLocations.getOrDefault(
                location.getDeviceId(),
                new DeviceLocation(location.getDeviceId(), null, new ConcurrentHashMap<>())
        );

        deviceLocation.setLocation(location);
        deviceLocations.put(location.getDeviceId(), deviceLocation);

        // Send the update via WebSocket
        messagingTemplate.convertAndSend("/topic/location", deviceLocation);
    }

    public Map<String, DeviceLocation> getAllDeviceLocations() {
        return deviceLocations;
    }

    public DeviceLocation getDeviceLocation(String deviceId) {
        return deviceLocations.get(deviceId);
    }
}
