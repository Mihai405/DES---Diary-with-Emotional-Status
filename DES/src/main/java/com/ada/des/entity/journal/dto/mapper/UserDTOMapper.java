package com.ada.des.entity.journal.dto.mapper;

import com.ada.des.entity.journal.dto.UserDTO;
import com.ada.des.entity.users.User;

import java.time.LocalDateTime;

public class UserDTOMapper {

    public static User getEntityFromDTO(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPasswordHash(userDTO.getPassword());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setDateCreated(LocalDateTime.now());
        return user;
    }

    public static UserDTO getDTOFromEntity(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        return userDTO;
    }
}
