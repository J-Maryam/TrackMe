package org.youcode.trackme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.youcode.trackme.entities.User;


public interface UserRepository extends JpaRepository<User, Long> {
}
