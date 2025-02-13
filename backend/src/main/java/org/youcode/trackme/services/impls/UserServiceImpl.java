package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
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

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository repository, UserMapper mapper) {
        super(repository, mapper);
        this.userRepository = repository;
        this.userMapper = mapper;
    }

    @Override
    public UserResponseDTO update(Long id, UserRequestDTO request) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with Id " + id + " not found"));

        existingUser.setUsername(request.username());
        existingUser.setPassword(request.password());
        existingUser.setEmail(request.email());
        existingUser.setPhoneNumber(request.phoneNumber());
        existingUser.setRole(request.role());

        User updatedUser = userRepository.save(existingUser);

        return userMapper.toDto(updatedUser);
    }
}
