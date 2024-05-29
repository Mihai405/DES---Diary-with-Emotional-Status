package com.ada.des.entity.journal.dto.mapper;

import com.ada.des.entity.journal.Mood;
import com.ada.des.entity.journal.Reason;

import java.time.LocalDateTime;

public class MoodDTO {


    private Long id;

    private LocalDateTime date;

    private String explanation;

    private Mood mood;

    private Reason reason;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public Mood getMood() {
        return mood;
    }

    public void setMood(Mood mood) {
        this.mood = mood;
    }

    public Reason getReason() {
        return reason;
    }

    public void setReason(Reason reason) {
        this.reason = reason;
    }
}
