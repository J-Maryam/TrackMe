package org.youcode.trackme.services.impls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.mappers.UserMapper;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.security.entities.AppUser;
import org.youcode.trackme.services.UserService;

@Service
@Transactional
public class UserServiceImpl extends GenericServiceImpl<AppUser, Long, UserRequestDTO, UserResponseDTO> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO update(Long id, UserRequestDTO request) {
        AppUser existingAppUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with Id " + id + " not found"));

        existingAppUser.setUsername(request.username());
        existingAppUser.setPassword(request.password());
        existingAppUser.setEmail(request.email());
        existingAppUser.setPhoneNumber(request.phoneNumber());

        AppUser updatedAppUser = userRepository.save(existingAppUser);

        return userMapper.toDto(updatedAppUser);
    }

    @Override
    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}
