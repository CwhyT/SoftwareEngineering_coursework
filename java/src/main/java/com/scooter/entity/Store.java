package com.scooter.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "stores")
public class Store extends UserHandler{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long storeId;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String manager;

    @Column(nullable = false)
    private Integer capacity;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createdAt = LocalDateTime.now().plusHours(8);

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}