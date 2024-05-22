package com.ada.des.service.impl;

import com.ada.des.controller.ChatController;
import com.ada.des.entity.journal.JournalEntry;
import com.ada.des.entity.journal.dto.JournalEntryDTO;
import com.ada.des.entity.journal.dto.mapper.JournalEntryDTOMapper;
import com.ada.des.repository.JournalEntryJpaRepository;
import com.ada.des.service.JournalEntryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JournalEntryServiceImpl implements JournalEntryService {

    private final JournalEntryJpaRepository journalEntryJpaRepository;
    private final ChatController chatController;

    public JournalEntryServiceImpl(JournalEntryJpaRepository journalEntryJpaRepository, ChatController chatController) {
        this.journalEntryJpaRepository = journalEntryJpaRepository;
        this.chatController = chatController;
    }

    @Override
    @Transactional
    public JournalEntryDTO save(JournalEntryDTO journalEntryDTO) {
        JournalEntry journalEntry = journalEntryJpaRepository.save(JournalEntryDTOMapper.getEntityFromDTO(journalEntryDTO));
        return JournalEntryDTOMapper.getDTOFromEntity(journalEntry);
    }
}
