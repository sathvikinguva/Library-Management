package com.librarymanagement.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IssueResponseDto {

    private Integer issueId;
    private Integer bookId;
    private String bookTitle;
    private Integer memberId;
    private String memberName;
    private Integer issuedById;
    private String issuedByName;
    private LocalDateTime issueDate;
    private LocalDateTime returnDate;
    private String status; // ISSUED / RETURNED
}
