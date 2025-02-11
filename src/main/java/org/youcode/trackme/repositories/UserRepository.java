package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.youcode.trackme.entities.Alert;
import org.youcode.trackme.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
