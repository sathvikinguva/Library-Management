package com.librarymanagement.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IssueRequestDto {

    @NotNull(message = "Book ID is required")
    private Integer bookId;

    @NotNull(message = "Member ID is required")
    private Integer memberId;

    @NotNull(message = "Issued-by librarian ID is required")
    private Integer issuedById;
}
