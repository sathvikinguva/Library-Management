package com.librarymanagement.backend.repository;

import com.librarymanagement.backend.entity.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Integer> {

    List<IssueRecord> findByMember_UserId(Integer memberId);

    long countByMember_UserIdAndReturnDateIsNull(Integer memberId);
}
