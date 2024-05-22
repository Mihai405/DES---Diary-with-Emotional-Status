package com.ada.des.repository;


import com.ada.des.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    int setActiveStatusById(Long id, Boolean isActive);

    int updatePasswordById(Long id, String password);

    List<User> findByIsActiveAndRole_Name(Boolean isActive, String roleName);

    void deleteByUsername(String username);
}
