package com.ada.des.service;

import com.ada.des.entity.users.User;

import java.util.List;

public interface UserService {

    //    User register(User user);
    List<User> getAll();
    User findByUsername(String username);
    Boolean containUserByEmail(String email);
    User getUserByEmail(String email);
}