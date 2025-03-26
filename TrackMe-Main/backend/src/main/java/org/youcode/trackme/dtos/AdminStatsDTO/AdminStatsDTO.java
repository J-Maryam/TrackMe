package org.youcode.trackme.dtos.AdminStatsDTO;

public record AdminStatsDTO(
        int activeBracelets,
        int inactiveBracelets,
        int pendingAlerts,
        long totalClients
) {
}
