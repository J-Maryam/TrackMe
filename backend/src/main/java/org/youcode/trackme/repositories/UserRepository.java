package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.youcode.trackme.security.entities.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    boolean existsByEmail(String email);
}
