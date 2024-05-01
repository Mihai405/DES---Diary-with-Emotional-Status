package com.ada.des.entity.journal;

import com.ada.des.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table
@Data
public class JournalEntry extends BaseEntity {
    private Date date;
    private ArrayList<Emotion> emotions;
    private String textSummary;
    private ArrayList<String> voiceMessages;
    private ArrayList<String> photos;
    private ArrayList<String> videos;
    private boolean favorite;
}
