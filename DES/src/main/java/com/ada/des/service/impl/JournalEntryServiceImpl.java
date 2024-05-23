package com.ada.des.service.impl;

import com.ada.des.controller.ChatController;
import com.ada.des.entity.journal.JournalEntry;
import com.ada.des.entity.journal.dto.JournalEntryDTO;
import com.ada.des.entity.journal.dto.mapper.JournalEntryDTOMapper;
import com.ada.des.entity.users.User;
import com.ada.des.repository.JournalEntryJpaRepository;
import com.ada.des.security.jwt.JwtUser;
import com.ada.des.service.JournalEntryService;
import com.ada.des.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class JournalEntryServiceImpl implements JournalEntryService {

    private final JournalEntryJpaRepository journalEntryJpaRepository;
    private final UserServiceImpl userService;

    public JournalEntryServiceImpl(JournalEntryJpaRepository journalEntryJpaRepository, UserServiceImpl userService) {
        this.journalEntryJpaRepository = journalEntryJpaRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public JournalEntryDTO save(JournalEntryDTO journalEntryDTO) {
        JournalEntry journalEntry = JournalEntryDTOMapper.getEntityFromDTO(journalEntryDTO);
        JwtUser jwtUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        journalEntry.setUser(userService.getUserByEmail(jwtUser.getEmail()));
        return JournalEntryDTOMapper.getDTOFromEntity(journalEntryJpaRepository.save(journalEntry));
    }

    @Override
    public List<JournalEntryDTO> getAllMoods() {
        return List.of();
    }
}
