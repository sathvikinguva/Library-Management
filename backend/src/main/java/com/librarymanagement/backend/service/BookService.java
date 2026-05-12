package com.librarymanagement.backend.service;

import com.librarymanagement.backend.dto.BookRequestDto;
import com.librarymanagement.backend.dto.BookResponseDto;
import com.librarymanagement.backend.entity.Book;
import com.librarymanagement.backend.exception.ResourceNotFoundException;
import com.librarymanagement.backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookResponseDto addBook(BookRequestDto dto) {
        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setAvailability(true);
        return toDto(bookRepository.save(book));
    }

    public List<BookResponseDto> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<BookResponseDto> getAvailableBooks() {
        return bookRepository.findByAvailabilityTrue().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<BookResponseDto> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Book getBookEntityById(Integer bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));
    }

    private BookResponseDto toDto(Book book) {
        return BookResponseDto.builder()
                .bookId(book.getBookId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .availability(book.getAvailability())
                .build();
    }
}
