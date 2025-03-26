package org.youcode.trackme.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GpsLocation {
    private double latitude;
    private double longitude;
    private int satellites;
    private String deviceId;
    private LocalDateTime timestamp = LocalDateTime.now();
}