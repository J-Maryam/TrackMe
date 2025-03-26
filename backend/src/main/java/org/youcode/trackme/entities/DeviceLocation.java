package org.youcode.trackme.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceLocation {
    private String deviceId;
    private GpsLocation location;
    private Map<String, String> deviceInfo = new HashMap<>();
}
