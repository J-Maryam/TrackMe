package org.youcode.trackme.services.impls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.youcode.trackme.dtos.AdminStatsDTO.AdminStatsDTO;
import org.youcode.trackme.entities.enums.AlertStatus;
import org.youcode.trackme.entities.enums.BraceletStatus;
import org.youcode.trackme.repositories.AlertRepository;
import org.youcode.trackme.repositories.BraceletRepository;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.services.AdminService;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
    @Autowired
    private BraceletRepository braceletRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserRepository clientRepository;

    @Override
    public AdminStatsDTO getStats() {
        int activeBracelets = (int) braceletRepository.countByStatus(BraceletStatus.ACTIVE);
        int inactiveBracelets = (int) braceletRepository.countByStatus(BraceletStatus.INACTIVE);
        int pendingAlerts = (int) alertRepository.countByStatus(AlertStatus.UNRESOLVED);
        int totalClients = (int) clientRepository.countByRoleId(2L);

        return new AdminStatsDTO(activeBracelets, inactiveBracelets, pendingAlerts, totalClients);
    }
}