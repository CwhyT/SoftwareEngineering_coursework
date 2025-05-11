package com.scooter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ScooterRentalApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScooterRentalApplication.class, args);
    }
} 