package org.youcode.trackme.security.services.interfaces;

import org.youcode.trackme.security.dtos.AppUserDTO.CreateAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.ResponseAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.UpdateAppUserDTO;
import org.youcode.trackme.security.dtos.AuthDTO.RequestLoginDTO;
import org.youcode.trackme.security.dtos.AuthDTO.ResponseLoginDTO;
import org.youcode.trackme.security.dtos.PasswordDTO.ChangePasswordDTO;

import java.util.List;

public interface IAppUserService {
    ResponseAppUserDTO create(CreateAppUserDTO user);
    ResponseAppUserDTO getByUsername(String username);
    List<ResponseAppUserDTO> getAllUsers();
    void deleteUser(String username);
    ResponseAppUserDTO updateUser(String username , UpdateAppUserDTO updateAppUserDTO);
    void changePassword(ChangePasswordDTO changePasswordDTO);
    ResponseLoginDTO login(RequestLoginDTO loginRequest);

}
