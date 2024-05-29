package com.ada.des.entity.journal;

import com.ada.des.entity.BaseEntity;
import com.ada.des.entity.users.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table
@Data
public class JournalEntry extends BaseEntity {

    @Column(name = "date")
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "emotion")
    private Mood mood;

    @Enumerated(EnumType.STRING)
    @Column(name = "reason")
    private Reason reason;

    @Column(name = "text_summary", columnDefinition = "TEXT")
    private java.lang.String textSummary;

    @Lob
    @Column(name = "voice_message", columnDefinition="BLOB")
    private byte[] voiceMessage;

    @Column(name = "favorite")
    private Boolean favorite;
    
    @ManyToOne
    @JoinColumn(name = "user_uuid")
    private User user;
}