package com.scooter.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "scooters")
public class Scooter extends UserHandler{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scooter_id")
    private Long scooterId;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String status; // AVAILABLE, IN_USE, MAINTENANCE, RETIRED

    @Column(nullable = false)
    private Double batteryLevel;

    @Column(nullable = false)
    private Double mileage;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createdAt = LocalDateTime.now().plusHours(8);

    @Column(nullable = false)
    private Double pricePerHour;

    @Column(nullable = false)
    private Double deposit = 0.0;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    // 添加 @Transient 字段用于接收 GET/POST 请求的 storeId
    @Transient
    private Long storeId;

    // 添加 @PostLoad 方法，在查询时自动填充 storeId
    @PostLoad
    public void postLoad() {
        if (store != null) {
            this.storeId = store.getStoreId();
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}