package com.exp8.pipeline;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByStatusAndScheduledAtLessThanEqual(String status, LocalDateTime time);
}
