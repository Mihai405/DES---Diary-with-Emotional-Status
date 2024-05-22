package com.ada.des.entity.journal.dto.mapper;

import com.ada.des.entity.journal.Emotion;
import com.ada.des.entity.journal.JournalEntry;
import com.ada.des.entity.journal.Reason;
import com.ada.des.entity.journal.dto.JournalEntryDTO;

public class JournalEntryDTOMapper {

    public static JournalEntry getEntityFromDTO(JournalEntryDTO journalEntryDTO) {
        JournalEntry journalEntry = new JournalEntry();
        journalEntry.setDate(journalEntryDTO.getDate());
        journalEntry.setReason(Reason.valueOf(journalEntryDTO.getReason()));
        journalEntry.setEmotion(Emotion.valueOf(journalEntryDTO.getEmotion()));
        journalEntry.setTextSummary(journalEntryDTO.getTextSummary());
        journalEntry.setVoiceMessage(journalEntryDTO.getVoiceMessage());
        journalEntry.setFavorite(journalEntryDTO.getFavorite());
        return journalEntry;
    }

    public static JournalEntryDTO getDTOFromEntity(JournalEntry journalEntry) {
        JournalEntryDTO journalEntryDTO = new JournalEntryDTO();
        journalEntryDTO.setDate(journalEntry.getDate());
        journalEntryDTO.setReason(journalEntry.getReason().name());
        journalEntryDTO.setEmotion(journalEntry.getEmotion().name());
        journalEntryDTO.setTextSummary(journalEntry.getTextSummary());
        journalEntryDTO.setVoiceMessage(journalEntry.getVoiceMessage());
        journalEntryDTO.setFavorite(journalEntry.getFavorite());
        return journalEntryDTO;
    }

}
