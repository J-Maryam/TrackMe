package org.youcode.trackme.services.impls;

import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.common.exceptions.EntityAlreadyExistsException;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.common.exceptions.UsernameAlreadyExistsException;
import org.youcode.trackme.common.services.GenericServiceImpl;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.entities.AppUser;
import org.youcode.trackme.entities.Role;
import org.youcode.trackme.mappers.UserMapper;
import org.youcode.trackme.repositories.RoleRepository;
import org.youcode.trackme.repositories.UserRepository;
import org.youcode.trackme.services.UserService;

@Service
@Transactional
public class UserServiceImpl extends GenericServiceImpl<AppUser, Long, UserRequestDTO, UserResponseDTO> implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    public UserServiceImpl(UserRepository repository, UserMapper mapper, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        super(repository, mapper);
        this.userRepository = repository;
        this.userMapper = mapper;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDTO create(UserRequestDTO userRequestDTO) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(userRequestDTO.email())) {
            throw new EntityAlreadyExistsException("Email already exists: " + userRequestDTO.email());
        }

        // Vérifier si le nom d'utilisateur existe déjà
        if (userRepository.existsByUsername(userRequestDTO.username())) {
            throw new EntityAlreadyExistsException("Username already exists: " + userRequestDTO.username());
        }

        Role role = roleRepository.findByName("ROLE_CLIENT").orElseThrow(() -> new EntityNotFoundException("Role '" + userRequestDTO.username() + "' not found"));

        // Créer un nouvel utilisateur
        AppUser user = new AppUser();
        user.setUsername(userRequestDTO.username());
        user.setPassword(passwordEncoder.encode(userRequestDTO.password())); // Hacher le mot de passe
        user.setEmail(userRequestDTO.email());
        user.setAddress(userRequestDTO.address());
        user.setPhoneNumber(userRequestDTO.phoneNumber());
        user.setRole(role); // Rôle par défaut : CLIENT

        // Sauvegarder l'utilisateur
        AppUser savedUser = userRepository.save(user);

        // Retourner le DTO de réponse
        return userMapper.toDto(savedUser);
    }

//    @Override
//    public UserResponseDTO register(UserRequestDTO dto) {
//        if (userRepository.findByUsername(dto.username()).isPresent()) {
//            throw new UsernameAlreadyExistsException("Username '" + dto.username() + "' already exists");
//        }
//
//        Role role = roleRepository.findByName("ROLE_CLIENT").orElseThrow(() -> new EntityNotFoundException("Role '" + dto.username() + "' not found"));
//
//        AppUser user = userMapper.toEntity(dto);
//        user.setRole(role);
//        user.setPassword(passwordEncoder.encode(dto.password()));
//
//        AppUser savedUser = userRepository.save(user);
//        return userMapper.toDto(savedUser);
//    }

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
}
