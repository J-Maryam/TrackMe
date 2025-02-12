package org.youcode.trackme.mappers;

import org.mapstruct.Mapper;
import org.youcode.trackme.common.Mapper.GenericMapper;
import org.youcode.trackme.dtos.user.UserRequestDTO;
import org.youcode.trackme.dtos.user.UserResponseDTO;
import org.youcode.trackme.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper extends GenericMapper<User, UserRequestDTO, UserResponseDTO> {
}
