package org.youcode.trackme.entities.enums;

public enum AlertType {
    OUT_OF_SAFE_ZONE,    // Patient hors de la zone autorisée
    BACK_IN_SAFE_ZONE,   // Patient revenu dans la zone
    LOW_BATTERY,         // Batterie faible
    NO_SIGNAL,           // Perte de signal
    SOS_TRIGGERED        // Alerte SOS déclenchée
}