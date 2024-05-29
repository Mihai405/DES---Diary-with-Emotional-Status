package com.ada.des.service;

import com.ada.des.entity.journal.dto.JournalEntryDTO;
import com.ada.des.entity.journal.dto.mapper.MoodDTO;

import java.util.List;

public interface JournalEntryService {

    JournalEntryDTO save(JournalEntryDTO journalEntryDTO);
    MoodDTO save(MoodDTO moodDTO);
    List<MoodDTO> getAllMoods();
    void delete(Long id);

}
