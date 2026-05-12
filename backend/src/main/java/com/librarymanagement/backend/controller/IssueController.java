package com.librarymanagement.backend.controller;

import com.librarymanagement.backend.dto.IssueRequestDto;
import com.librarymanagement.backend.dto.IssueResponseDto;
import com.librarymanagement.backend.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping("/issue")
    public ResponseEntity<IssueResponseDto> issueBook(@Valid @RequestBody IssueRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(issueService.issueBook(dto));
    }

    @PutMapping("/return/{issueId}")
    public ResponseEntity<IssueResponseDto> returnBook(@PathVariable Integer issueId) {
        return ResponseEntity.ok(issueService.returnBook(issueId));
    }
}
