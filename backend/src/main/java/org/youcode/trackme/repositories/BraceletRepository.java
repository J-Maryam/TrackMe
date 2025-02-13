package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.youcode.trackme.entities.Bracelet;

@Repository
public interface BraceletRepository extends JpaRepository<Bracelet, Long> {
}
