package com.librarymanagement.backend.controller;

import com.librarymanagement.backend.dto.IssueResponseDto;
import com.librarymanagement.backend.dto.MemberRequestDto;
import com.librarymanagement.backend.dto.MemberResponseDto;
import com.librarymanagement.backend.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<MemberResponseDto> registerMember(@Valid @RequestBody MemberRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(memberService.registerMember(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponseDto> getMember(@PathVariable Integer id) {
        return ResponseEntity.ok(memberService.getMemberById(id));
    }

    @GetMapping("/{id}/issues")
    public ResponseEntity<List<IssueResponseDto>> getMemberIssues(@PathVariable Integer id) {
        return ResponseEntity.ok(memberService.getBooksIssuedToMember(id));
    }
}
