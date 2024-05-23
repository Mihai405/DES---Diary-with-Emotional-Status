package com.ada.des.service;

import com.ada.des.entity.journal.dto.JournalEntryDTO;

import java.util.List;

public interface JournalEntryService {

    JournalEntryDTO save(JournalEntryDTO journalEntryDTO);
    List<JournalEntryDTO> getAllMoods();

}
