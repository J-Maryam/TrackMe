package org.youcode.trackme.security.mappers;


import org.mapstruct.*;
import org.youcode.trackme.security.dtos.AppUserDTO.CreateAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.ResponseAppUserDTO;
import org.youcode.trackme.security.dtos.AppUserDTO.UpdateAppUserDTO;
import org.youcode.trackme.security.entities.AppUser;
import org.youcode.trackme.security.mappers.helpers.AppRoleMapperHelper;

@Mapper(componentModel = "spring",uses = {AppRoleMapperHelper.class}, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AppUserMapper {

    @Mapping(target = "role", source = "roleId")
    AppUser toEntity(CreateAppUserDTO createDTO);

    @Mapping(target = "role", source = "roleId")
    AppUser updateEntityFromDTO(UpdateAppUserDTO updateAppUserDTO, @MappingTarget AppUser entity);

    ResponseAppUserDTO toDTO(AppUser entity);
}
