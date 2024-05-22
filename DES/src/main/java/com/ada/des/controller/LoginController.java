package com.ada.des.controller;

import com.ada.des.entity.users.User;
import com.ada.des.service.UserService;
import com.ada.des.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
//    @Autowired
//    private UserServiceImpl userService;

//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        if (userService.findByUsername(user.getUsername()) != null) {
//            return ResponseEntity.badRequest().body("Username is already taken!");
//        }
//        userService.saveUser(user);
//        return ResponseEntity.ok("User registered successfully!");
//    }
}
