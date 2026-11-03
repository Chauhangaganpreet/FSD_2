package com.exp8.pipeline;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ProcessedEvent {
    @Id
    public String eventId;
    public ProcessedEvent() {}
    public ProcessedEvent(String eventId) { this.eventId = eventId; }
}
