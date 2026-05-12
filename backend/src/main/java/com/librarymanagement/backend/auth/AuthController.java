package com.librarymanagement.backend.auth;

import com.librarymanagement.backend.auth.dto.LoginRequest;
import com.librarymanagement.backend.auth.dto.LoginResponse;
import com.librarymanagement.backend.auth.dto.UserResponse;
import com.librarymanagement.backend.config.JwtService;
import com.librarymanagement.backend.entity.User;
import com.librarymanagement.backend.enums.Role;
import com.librarymanagement.backend.repository.UserRepository;
import com.librarymanagement.backend.service.CustomUserDetailsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(request.getEmail());
            newUser.setName(deriveNameFromEmail(request.getEmail()));
            newUser.setPassword(passwordEncoder.encode(request.getPassword()));
            newUser.setRole(Role.MEMBER);
            return userRepository.save(newUser);
        });

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

        return ResponseEntity.ok(new LoginResponse(token, UserResponse.from(user)));
    }

    private String deriveNameFromEmail(String email) {
        int atIndex = email.indexOf('@');
        String local = atIndex > 0 ? email.substring(0, atIndex) : email;
        String normalized = local.replace('.', ' ').trim();
        return normalized.isEmpty() ? "Member" : normalized;
    }
}
