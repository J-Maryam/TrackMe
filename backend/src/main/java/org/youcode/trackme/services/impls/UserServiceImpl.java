package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.entities.User;
import org.youcode.trackme.mappers.UserMapper;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.services.UserService;

@Service
@Transactional
@Validated
public class UserServiceImpl extends GenericServiceImpl<User, Long, UserRequestDTO, UserResponseDTO> implements UserService {
    public UserServiceImpl(UserRepository repository, UserMapper mapper) {
        super(repository, mapper);
    }
}
