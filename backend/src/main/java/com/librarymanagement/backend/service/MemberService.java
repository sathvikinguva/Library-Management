package com.librarymanagement.backend.service;

import com.librarymanagement.backend.dto.IssueResponseDto;
import com.librarymanagement.backend.dto.MemberRequestDto;
import com.librarymanagement.backend.dto.MemberResponseDto;
import com.librarymanagement.backend.entity.IssueRecord;
import com.librarymanagement.backend.entity.User;
import com.librarymanagement.backend.enums.Role;
import com.librarymanagement.backend.exception.BusinessException;
import com.librarymanagement.backend.exception.ResourceNotFoundException;
import com.librarymanagement.backend.repository.IssueRecordRepository;
import com.librarymanagement.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final UserRepository userRepository;
    private final IssueRecordRepository issueRecordRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(UserRepository userRepository,
                         IssueRecordRepository issueRecordRepository,
                         PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.issueRecordRepository = issueRecordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public MemberResponseDto registerMember(MemberRequestDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("Email already registered: " + dto.getEmail());
        }
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.MEMBER);
        return toDto(userRepository.save(user));
    }

    public MemberResponseDto getMemberById(Integer memberId) {
        return toDto(findById(memberId));
    }

    public List<IssueResponseDto> getBooksIssuedToMember(Integer memberId) {
        findById(memberId);
        return issueRecordRepository.findByMember_UserId(memberId).stream()
                .map(this::toIssueDto)
                .collect(Collectors.toList());
    }

    public User getUserEntityById(Integer userId) {
        return findById(userId);
    }

    public List<MemberResponseDto> getAllMembers() {
        return userRepository.findByRole(Role.MEMBER).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private User findById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + userId));
    }

    private MemberResponseDto toDto(User user) {
        return MemberResponseDto.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .build();
    }

    private IssueResponseDto toIssueDto(IssueRecord record) {
        return IssueResponseDto.builder()
                .issueId(record.getIssueId())
                .bookId(record.getBook().getBookId())
                .bookTitle(record.getBook().getTitle())
                .memberId(record.getMember().getUserId())
                .memberName(record.getMember().getName())
                .issuedById(record.getIssuedBy().getUserId())
                .issuedByName(record.getIssuedBy().getName())
                .issueDate(record.getIssueDate())
                .returnDate(record.getReturnDate())
                .status(record.getReturnDate() == null ? "ISSUED" : "RETURNED")
                .build();
    }
}
