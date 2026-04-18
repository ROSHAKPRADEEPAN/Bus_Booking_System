package com.vehiclebooking.dto;

public class AuthResponse {
    private String token;
    private String role;
    private Long id;
    private String email;
    private String username;

    // No-arg constructor
    public AuthResponse() {
    }

    // Constructor with all fields
    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // Constructor with all fields including user details
    public AuthResponse(String token, String role, Long id, String email, String username) {
        this.token = token;
        this.role = role;
        this.id = id;
        this.email = email;
        this.username = username;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Optional: toString method for logging/debugging
    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                ", role='" + role + '\'' +
                ", id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
