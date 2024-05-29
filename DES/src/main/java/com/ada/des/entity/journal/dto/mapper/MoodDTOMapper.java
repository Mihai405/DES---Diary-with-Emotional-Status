package com.ada.des.entity.journal.dto.mapper;

import com.ada.des.entity.journal.JournalEntry;

import java.time.LocalDateTime;

public class MoodDTOMapper {

    public static JournalEntry getEntityFromDTO(MoodDTO moodDTO) {
        JournalEntry journalEntry = new JournalEntry();
        journalEntry.setDate(LocalDateTime.now());
        journalEntry.setReason(moodDTO.getReason());
        journalEntry.setMood(moodDTO.getMood());
        journalEntry.setTextSummary(moodDTO.getExplanation());
        return journalEntry;
    }

    public static MoodDTO getDTOFromEntity(JournalEntry journalEntry) {
        MoodDTO moodDTO = new MoodDTO();
        moodDTO.setId(journalEntry.getId());
        moodDTO.setDate(journalEntry.getDate());
        moodDTO.setReason(journalEntry.getReason());
        moodDTO.setMood(journalEntry.getMood());
        moodDTO.setExplanation(journalEntry.getTextSummary());
        return moodDTO;
    }
}
