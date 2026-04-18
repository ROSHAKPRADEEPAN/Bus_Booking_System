package com.vehiclebooking.controller;

import com.vehiclebooking.dto.AuthRequest;
import com.vehiclebooking.dto.AuthResponse;
import com.vehiclebooking.dto.RegisterRequest;
import com.vehiclebooking.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
// @CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerUser(request));
    }

    @PostMapping("/register-owner")
    public ResponseEntity<AuthResponse> registerOwner(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerOwner(request));
    }

    // ✅ User login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginUser(request));
    }

    // ✅ Owner login
    @PostMapping("/login-owner")
    public ResponseEntity<AuthResponse> loginOwner(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginOwner(request));
    }
}
