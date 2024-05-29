package com.ada.des.entity.journal.dto.mapper;

import com.ada.des.entity.journal.Mood;
import com.ada.des.entity.journal.JournalEntry;
import com.ada.des.entity.journal.Reason;
import com.ada.des.entity.journal.dto.JournalEntryDTO;
import org.springframework.stereotype.Component;

@Component
public class JournalEntryDTOMapper {

    public static JournalEntry getEntityFromDTO(JournalEntryDTO journalEntryDTO) {
        JournalEntry journalEntry = new JournalEntry();
        journalEntry.setDate(journalEntryDTO.getDate());
        journalEntry.setReason(Reason.valueOf(journalEntryDTO.getReason()));
        journalEntry.setMood(Mood.valueOf(journalEntryDTO.getEmotion()));
        journalEntry.setTextSummary(journalEntryDTO.getTextSummary());
        journalEntry.setVoiceMessage(journalEntryDTO.getVoiceMessage());
        journalEntry.setFavorite(journalEntryDTO.getFavorite());
        return journalEntry;
    }

    public static JournalEntryDTO getDTOFromEntity(JournalEntry journalEntry) {
        JournalEntryDTO journalEntryDTO = new JournalEntryDTO();
        journalEntryDTO.setDate(journalEntry.getDate());
        journalEntryDTO.setReason(journalEntry.getReason().name());
        journalEntryDTO.setEmotion(journalEntry.getMood().name());
        journalEntryDTO.setTextSummary(journalEntry.getTextSummary());
        journalEntryDTO.setFavorite(journalEntry.getFavorite());
        return journalEntryDTO;
    }

}
