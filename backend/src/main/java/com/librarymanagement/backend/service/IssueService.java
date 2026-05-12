package com.librarymanagement.backend.service;

import com.librarymanagement.backend.dto.IssueRequestDto;
import com.librarymanagement.backend.dto.IssueResponseDto;
import com.librarymanagement.backend.entity.Book;
import com.librarymanagement.backend.entity.IssueRecord;
import com.librarymanagement.backend.entity.User;
import com.librarymanagement.backend.exception.BusinessException;
import com.librarymanagement.backend.exception.ResourceNotFoundException;
import com.librarymanagement.backend.repository.BookRepository;
import com.librarymanagement.backend.repository.IssueRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class IssueService {

    private static final int MAX_ACTIVE_ISSUES = 3;

    private final IssueRecordRepository issueRecordRepository;
    private final BookService bookService;
    private final MemberService memberService;
    private final BookRepository bookRepository;

    public IssueService(IssueRecordRepository issueRecordRepository,
                        BookService bookService,
                        MemberService memberService,
                        BookRepository bookRepository) {
        this.issueRecordRepository = issueRecordRepository;
        this.bookService = bookService;
        this.memberService = memberService;
        this.bookRepository = bookRepository;
    }

    @Transactional
    public IssueResponseDto issueBook(IssueRequestDto dto) {
        Book book = bookService.getBookEntityById(dto.getBookId());
        if (!book.getAvailability()) {
            throw new BusinessException("Book is not available for issue: " + book.getTitle());
        }

        User member = memberService.getUserEntityById(dto.getMemberId());
        long activeIssues = issueRecordRepository.countByMember_UserIdAndReturnDateIsNull(member.getUserId());
        if (activeIssues >= MAX_ACTIVE_ISSUES) {
            throw new BusinessException("Member has reached the maximum limit of " + MAX_ACTIVE_ISSUES + " active issues");
        }

        User issuedBy = memberService.getUserEntityById(dto.getIssuedById());

        book.setAvailability(false);
        bookRepository.save(book);

        IssueRecord record = new IssueRecord();
        record.setBook(book);
        record.setMember(member);
        record.setIssuedBy(issuedBy);
        record.setIssueDate(LocalDateTime.now());

        return toDto(issueRecordRepository.save(record));
    }

    @Transactional
    public IssueResponseDto returnBook(Integer issueId) {
        IssueRecord record = issueRecordRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue record not found with id: " + issueId));

        if (record.getReturnDate() != null) {
            throw new BusinessException("Book has already been returned for issue id: " + issueId);
        }

        record.setReturnDate(LocalDateTime.now());
        issueRecordRepository.save(record);

        Book book = record.getBook();
        book.setAvailability(true);
        bookRepository.save(book);

        return toDto(record);
    }

    private IssueResponseDto toDto(IssueRecord record) {
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
