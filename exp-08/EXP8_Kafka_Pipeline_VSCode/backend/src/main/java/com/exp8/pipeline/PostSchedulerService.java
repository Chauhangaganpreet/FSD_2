package com.exp8.pipeline;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PostSchedulerService {
    private final PostRepository posts;
    private final KafkaTemplate<String, PostEvent> kafka;

    public PostSchedulerService(PostRepository posts, KafkaTemplate<String, PostEvent> kafka) {
        this.posts = posts; this.kafka = kafka;
    }

    @Scheduled(fixedDelay = 10000)
    public void sendDuePosts() {
        for (Post p : posts.findByStatusAndScheduledAtLessThanEqual("PENDING", LocalDateTime.now())) {
            PostEvent event = new PostEvent(UUID.randomUUID().toString(), p.id, p.content);
            kafka.send("post-topic", event.eventId, event);
            p.status = "PROCESSING";
            posts.save(p);
            System.out.println("Sent post " + p.id + " to Kafka");
        }
    }
}
