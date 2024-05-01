package com.ada.des.entity.users;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
public class Customer extends User{
    private byte[] profilePicture;

    public Customer(String username, String email, String passwordHash) {
        super(username, email, passwordHash);
    }

    public Customer() {
        super();
    }
}
