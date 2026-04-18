package com.vehiclebooking.dto;

public class AuthRequest {
    private String email;
    private String password;

    // No-arg constructor
    public AuthRequest() {
    }

    // All-arg constructor
    public AuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Optional: for debugging
    @Override
    public String toString() {
        return "AuthRequest{" +
                "email='" + email + '\'' +
                ", password='********'" +  // hide password
                '}';
    }
}
