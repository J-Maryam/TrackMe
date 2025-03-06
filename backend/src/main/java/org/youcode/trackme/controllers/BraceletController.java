package org.youcode.trackme.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.youcode.trackme.common.controllers.GenericControllerImpl;
import org.youcode.trackme.dtos.bracelet.BraceletRequestDTO;
import org.youcode.trackme.dtos.bracelet.BraceletResponseDTO;
import org.youcode.trackme.entities.Bracelet;
import org.youcode.trackme.services.BraceletService;

@RestController
@RequestMapping("/api/public/bracelets")
@CrossOrigin(origins = "http://localhost:4200")
public class BraceletController extends GenericControllerImpl<Bracelet, Long, BraceletRequestDTO, BraceletResponseDTO> {
    public BraceletController(BraceletService service) {
        super(service);
    }
}
