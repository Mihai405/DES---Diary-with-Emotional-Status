package com.ada.des.entity.journal.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class JournalEntryDTO {

    private LocalDateTime date;
    private String emotion;
    private String reason;
    private String textSummary;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private byte[] voiceMessage;
    private Boolean favorite;

    public JournalEntryDTO() {
    }

    public JournalEntryDTO(LocalDateTime date, String emotion, String reason, String textSummary, byte[] voiceMessage, Boolean favorite) {
        this.date = date;
        this.emotion = emotion;
        this.reason = reason;
        this.textSummary = textSummary;
        this.voiceMessage = voiceMessage;
        this.favorite = favorite;
    }
}
