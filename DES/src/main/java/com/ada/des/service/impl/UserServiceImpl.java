package com.ada.des.service.impl;

import com.ada.des.entity.journal.dto.LogInVO;
import com.ada.des.entity.journal.dto.TokenResponse;
import com.ada.des.entity.journal.dto.UserDTO;
import com.ada.des.entity.journal.dto.mapper.UserDTOMapper;
import com.ada.des.entity.users.User;
import com.ada.des.repository.UsersRepository;
import com.ada.des.security.jwt.JwtTokenProvider;
import com.ada.des.security.jwt.JwtUser;
import com.ada.des.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UsersRepository usersRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UsersRepository usersRepository, AuthenticationManager authenticationManager,
                           JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

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

    @Transactional
    public UserDTO saveUser(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = UserDTOMapper.getEntityFromDTO(userDTO);
        return UserDTOMapper.getDTOFromEntity(usersRepository.save(user));
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

    public TokenResponse login(LogInVO logInVO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logInVO.getEmail(), logInVO.getPassword()));
        return new TokenResponse(jwtTokenProvider.createToken(logInVO.getEmail(), new ArrayList<>()));
    }
}