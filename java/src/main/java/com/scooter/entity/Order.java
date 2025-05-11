package com.scooter.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@Entity
@Table(name = "orders")
public class Order extends UserHandler{
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Transient
    private Long userId;

    // 添加 @PostLoad 方法，在查询时自动填充 storeId
    @PostLoad
    public void postLoad() {
        if (user != null) {
            this.userId = user.getUserId();
        }
    }

    @Column(nullable = false)
    private String scooterId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;
    @Transient
    private String orderStartTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;
    @Transient
    private String orderEndTime;


    private Double totalAmount = 0.0;

    @Column(nullable = false)
    private Double rentHours; // 租借时长，由前端传入

    @Column(nullable = false)
    private String status = "normal";

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Transient
    private Integer couponId;

    @PrePersist
    protected void onCreate() {
//        createdAt = LocalDateTime.now(ZoneId.of("Asia/Shanghai"));
//        updatedAt = LocalDateTime.now(ZoneId.of("Asia/Shanghai"));
//        startTime = LocalDateTime.now(ZoneId.of("Asia/Shanghai"));
        createdAt = LocalDateTime.now();;
        updatedAt = LocalDateTime.now();;
        if (startTime == null){
            startTime = LocalDateTime.now();;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();;
    }
}