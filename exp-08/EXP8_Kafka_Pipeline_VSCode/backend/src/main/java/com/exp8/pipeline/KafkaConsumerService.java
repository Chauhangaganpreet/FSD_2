package com.exp8.pipeline;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class KafkaConsumerService {
    private final PostRepository posts;
    private final ProcessedEventRepository processed;
    private final KafkaTemplate<String, PostEvent> kafka;
    private final Random random = new Random();

    public KafkaConsumerService(PostRepository posts, ProcessedEventRepository processed,
                                KafkaTemplate<String, PostEvent> kafka) {
        this.posts = posts; this.processed = processed; this.kafka = kafka;
    }

    @KafkaListener(topics = "post-topic", groupId = "post-publisher-group")
    public void publish(PostEvent event) {
        if (event == null || event.eventId == null || event.postId == null) return;
        if (processed.existsById(event.eventId)) {
            System.out.println("Duplicate event ignored: " + event.eventId);
            return;
        }

        for (int attempt = 1; attempt <= 3; attempt++) {
            try {
                // Simulate occasional publishing failure, as described in the lab instructions.
                if (random.nextInt(5) == 0) throw new RuntimeException("Simulated publishing error");
                Post p = posts.findById(event.postId).orElseThrow();
                p.status = "PUBLISHED";
                posts.save(p);
                processed.save(new ProcessedEvent(event.eventId));
                System.out.println("Published post " + p.id);
                return;
            } catch (Exception ex) {
                System.out.println("Attempt " + attempt + " failed: " + ex.getMessage());
                if (attempt < 3) {
                    try { Thread.sleep(1000L * (1L << (attempt - 1))); }
                    catch (InterruptedException interrupted) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }
        }

        kafka.send("post-topic-dlq", event.eventId, event);
        posts.findById(event.postId).ifPresent(p -> {
            p.status = "FAILED";
            posts.save(p);
        });
        System.out.println("Event sent to post-topic-dlq: " + event.eventId);
    }

    @KafkaListener(topics = "post-topic-dlq", groupId = "post-dlq-group")
    public void deadLetter(PostEvent event) {
        System.out.println("DLQ received failed event: " + (event == null ? "unknown" : event.eventId));
    }
}
