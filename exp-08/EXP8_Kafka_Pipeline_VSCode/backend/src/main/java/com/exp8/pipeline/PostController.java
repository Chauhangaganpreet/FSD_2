package com.exp8.pipeline;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177"
})
public class PostController {
    private final PostRepository posts;

    public PostController(PostRepository posts) { this.posts = posts; }

    @GetMapping
    public List<Post> all() { return posts.findAll(); }

    @PostMapping
    public Post create(@RequestBody NewPost input) {
        Post p = new Post();
        p.content = input.content;
        p.scheduledAt = input.scheduledAt == null ? LocalDateTime.now().plusMinutes(1) : input.scheduledAt;
        p.status = "PENDING";
        return posts.save(p);
    }

    public static class NewPost {
        public String content;
        public LocalDateTime scheduledAt;
    }
}
