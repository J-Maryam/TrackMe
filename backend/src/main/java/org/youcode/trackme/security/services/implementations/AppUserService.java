package org.youcode.trackme.security.services.implementations;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.security.config.Jwt.JwtUtils;
import org.youcode.trackme.security.dtos.AppUserDTO.CreateAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.ResponseAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.UpdateAppUserDTO;
import org.youcode.trackme.security.dtos.AuthDTO.RequestLoginDTO;
import org.youcode.trackme.security.dtos.AuthDTO.ResponseLoginDTO;
import org.youcode.trackme.security.dtos.PasswordDTO.ChangePasswordDTO;
import org.youcode.trackme.security.entities.AppRole;
import org.youcode.trackme.security.entities.AppUser;
import org.youcode.trackme.security.mappers.AppUserMapper;
import org.youcode.trackme.security.repositories.AppRoleRepository;
import org.youcode.trackme.security.repositories.AppUserRepository;
import org.youcode.trackme.security.services.interfaces.IAppUserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserService implements IAppUserService {

    public final AppUserRepository appUserRepository;
    public final AppRoleRepository appRoleRepository;
    public final AppUserMapper appUserMapper;
    public final PasswordEncoder passwordEncoder;
//    public final HaveIBeenPwnedService haveIBeenPwnedService;
    public final AuthenticationManager authenticationManager;
    public final JwtUtils jwtUtils;

    @Override
    public ResponseAppUserDTO create(CreateAppUserDTO createAppUserDTO) {
        if (appUserRepository.findByUsername(createAppUserDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Ce nom d'utilisateur existe déjà.");
        }
        if (appUserRepository.findByEmail(createAppUserDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Cette email existe déjà.");
        }

        AppRole role = appRoleRepository.findById(createAppUserDTO.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Role not found with Id : " + createAppUserDTO.getRoleId()));
//        if (haveIBeenPwnedService.isPasswordPwned(createAppUserDTO.getPassword())) {
//            throw new IllegalArgumentException("Le mot de passe est compromis. Veuillez en choisir un autre.");
//        }
        AppUser user = appUserMapper.toEntity(createAppUserDTO);
        user.setPassword(passwordEncoder.encode(createAppUserDTO.getPassword()));
        user.setRole(role);
        return appUserMapper.toDTO(appUserRepository.save(user)) ;
    }

    @Override
    public ResponseLoginDTO login(RequestLoginDTO loginRequest) {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword())
            );

            String token = jwtUtils.generateToken(loginRequest.getEmail());
            ResponseLoginDTO response = new ResponseLoginDTO();
            response.setToken(token);
            response.setEmail(authentication.getName());
            response.setRole(authentication.getAuthorities().iterator().next().getAuthority());
            return response;

    }

//    @Override
//    public List<ResponseAppUserDTO> getAllUsers() {
//        List<AppUser> users = appUserRepository.findAll();
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userAuth = authentication.getName();
//        List<AppUser> newUsers = users.stream().filter(user -> !user.getUsername().equals(userAuth)).toList();
//        return newUsers.stream().map(appUserMapper::toDTO).toList();
//    }

    @Override
    public List<ResponseAppUserDTO> getAllUsers() {
        List<AppUser> users = appUserRepository.findAll();

        List<AppUser> clientUsers = users.stream()
                .filter(user -> user.getRole().getRoleName().equals("ROLE_CLIENT"))
                .toList();

        return clientUsers.stream()
                .map(appUserMapper::toDTO)
                .toList();
    }

    @Override
    public void deleteUser(String username){
        AppUser user = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec le nom d'utilisateur : " + username));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userAuth = authentication.getName();
        if(userAuth.equals(username)) {
            throw new IllegalArgumentException("Vous ne pouvez pas supprimer votre propre compte.");
        }
        appUserRepository.delete(user);

    }

    @Override
    public void delete(Long id) {
        AppUser entity = appUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with Id " + id + " not found"));
        appUserRepository.delete(entity);
    }

    @Override
    public ResponseAppUserDTO updateUser(String username , UpdateAppUserDTO updateAppUserDTO) {
        AppUser user = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec le nom d'utilisateur : " + username));
        AppRole role = appRoleRepository.findById(updateAppUserDTO.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Ce rôle n'existe pas."));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userAuth = authentication.getName();
        if(userAuth.equals(username)) {
            throw new IllegalArgumentException("Vous ne pouvez pas modifier votre propre rôle.");
        }
        AppUser updatedAppUser = appUserMapper.updateEntityFromDTO(updateAppUserDTO, user);
        updatedAppUser = appUserRepository.save(updatedAppUser);
        return appUserMapper.toDTO(updatedAppUser);
    }


    @Override
    public ResponseAppUserDTO getByUsername(String username) {
        AppUser user = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec le nom d'utilisateur : " + username));

        return appUserMapper.toDTO(user);
    }

    @Override
    public void changePassword(ChangePasswordDTO changePasswordDTO) {
        if(changePasswordDTO.getOldPassword().equals(changePasswordDTO.getNewPassword())) {
            throw new BadCredentialsException("Le nouveau mot de passe ne peut pas être identique à l'ancien mot de passe.");
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userAuth = authentication.getName();
        AppUser user = appUserRepository.findByUsername(userAuth)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));
        if (!passwordEncoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())) {
            throw new BadCredentialsException("Ancien mot de passe incorrect");
        }
         user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
         appUserRepository.save(user);
    }
}
