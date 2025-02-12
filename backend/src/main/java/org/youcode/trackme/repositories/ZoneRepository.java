package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.youcode.trackme.entities.Geofence;

@Repository
public interface ZoneRepository extends JpaRepository<Geofence, Long> {
}
