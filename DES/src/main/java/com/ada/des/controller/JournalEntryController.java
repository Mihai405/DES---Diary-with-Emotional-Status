package com.ada.des.controller;
import com.ada.des.entity.journal.dto.JournalEntryDTO;
import com.ada.des.service.JournalEntryService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class JournalEntryController {

    private final JournalEntryService journalEntryService;
    private final ChatController chatController;

    public JournalEntryController(JournalEntryService journalEntryService, ChatController chatController) {
        this.journalEntryService = journalEntryService;
        this.chatController = chatController;
    }

    //TODO sync with frontend;
    @GetMapping(path = "/journal", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> saveEmployee(@RequestPart String emotion,
                                          @RequestPart String reason,
                                          @RequestPart(required = false) String textSummary,
                                          @RequestPart(required = false) MultipartFile voiceMessage,
                                          @RequestPart(required = false) String favorite) {
        try {
            String audioString  = chatController.transcribeAudio(voiceMessage);
            JournalEntryDTO journalEntryDTO = new JournalEntryDTO(null, emotion, reason, audioString, voiceMessage.getBytes(), Boolean.parseBoolean(favorite));
            return ResponseEntity.ok(journalEntryService.save(journalEntryDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
