package com.exp8.pipeline;

public class PostEvent {
    public String eventId;
    public Long postId;
    public String content;

    public PostEvent() {}
    public PostEvent(String eventId, Long postId, String content) {
        this.eventId = eventId;
        this.postId = postId;
        this.content = content;
    }
}
