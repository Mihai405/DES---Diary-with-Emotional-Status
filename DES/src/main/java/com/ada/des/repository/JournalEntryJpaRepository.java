package com.ada.des.repository;

import com.ada.des.entity.journal.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalEntryJpaRepository extends JpaRepository<JournalEntry, Long> {
}
