package com.scooter.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * <p>
 * 用户优惠券中间表
 * </p>
 */
@Data
@Entity
@Table(name = "user_coupon")
public class UserCoupon extends UserHandler implements Serializable {

    private static final long serialVersionUID = 1L;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;

    //用户ID
    @Column(nullable = false)
    private Integer userId;

    //优惠券ID
    @Column(nullable = false)
    private Integer couponId;

    //优惠额度
    @Column(nullable = false)
    private BigDecimal couponAmount;

    //使用状态：0-未使用，1-已使用
    @Column(nullable = false)
    private Integer status;

    //发放时间
    @Column(nullable = false)
    private LocalDateTime createTime;

    //更新时间
    @Column(nullable = false)
    private LocalDateTime updateTime;

    //使用订单ID
    @Column(nullable = false)
    private String orderId;

    //使用时间
    @Column(nullable = false)
    private LocalDateTime useTime;



    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
    }
}
