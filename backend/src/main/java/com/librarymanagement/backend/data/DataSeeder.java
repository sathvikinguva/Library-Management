package com.librarymanagement.backend.data;

import com.librarymanagement.backend.entity.User;
import com.librarymanagement.backend.enums.Role;
import com.librarymanagement.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// @Component - Disabled: No default data seeding
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User librarian = User.builder()
                .name("Ava Reynolds")
                .email("librarian@lib.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.LIBRARIAN)
                .build();

        User member = User.builder()
                .name("Noah Turner")
                .email("member@lib.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.MEMBER)
                .build();

        User memberTwo = User.builder()
                .name("Maya Patel")
                .email("maya@lib.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.MEMBER)
                .build();

        userRepository.save(librarian);
        userRepository.save(member);
        userRepository.save(memberTwo);
    }
}
