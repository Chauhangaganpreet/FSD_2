package com.exp8.pipeline;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String content;
    public LocalDateTime scheduledAt;
    public String status = "PENDING";
    public Post() {}
}
