package com.exp8.pipeline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Exp8Application {
    public static void main(String[] args) {
        SpringApplication.run(Exp8Application.class, args);
    }
}
