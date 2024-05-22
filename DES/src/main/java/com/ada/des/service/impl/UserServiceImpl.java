package com.ada.des.service.impl;

import com.ada.des.entity.users.User;
import com.ada.des.repository.UsersRepository;
import com.ada.des.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<User> getAll() {
        return usersRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    @Override
    public Boolean containUserByEmail(String email) {
        return usersRepository.existsByEmail(email);
    }

    @Override

    public User getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
    
    public User saveUser(User user) {
        return usersRepository.save(user);
    }

    public User updateUser(Long userId, User userDetails) {
        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPasswordHash(userDetails.getPasswordHash()); // Make sure to hash the password if not already done
        return usersRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        usersRepository.delete(user);
    }
}