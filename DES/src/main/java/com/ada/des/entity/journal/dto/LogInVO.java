package com.ada.des.entity.journal.dto;

public class LogInVO {
    private final String email;
    private final String password;

    public LogInVO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
