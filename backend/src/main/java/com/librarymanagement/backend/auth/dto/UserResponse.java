package com.librarymanagement.backend.auth.dto;

import com.librarymanagement.backend.entity.User;
import com.librarymanagement.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {

    private Integer userId;
    private String name;
    private String email;
    private Role role;

    public static UserResponse from(User user) {
        return new UserResponse(user.getUserId(), user.getName(), user.getEmail(), user.getRole());
    }
}
