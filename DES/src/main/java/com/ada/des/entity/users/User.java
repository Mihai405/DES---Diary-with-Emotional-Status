package com.ada.des.entity.users;

import com.ada.des.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
public abstract class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String passwordHash;
    @Column(nullable = false)
    private LocalDateTime dateCreated;
    @Column
    private LocalDateTime lastLogin;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;
    @Column(name = "profile_pictures")
    private byte[] profilePicture;

    public User(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.dateCreated = LocalDateTime.now();
    }

    public User() {

    }

}
