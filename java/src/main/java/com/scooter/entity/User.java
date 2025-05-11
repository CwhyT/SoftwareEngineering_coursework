package com.scooter.entity;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.validation.constraints.Past;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User extends UserHandler{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 50, message = "用户名长度必须在3-50个字符之间")
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, message = "密码长度不能少于6个字符")
    @Column(nullable = false)
    private String password;

    @Email(message = "邮箱格式不正确")
    @NotBlank(message = "邮箱不能为空")
    @Column(unique = true, nullable = false)
    private String email;

    @Past(message = "出生日期必须是过去的日期")
    @Column(nullable = false)
    private LocalDate birthDate;

    @NotBlank(message = "电话号码不能为空")
    @Size(min = 11, max = 11, message = "电话号码必须是11位")
    @Column(nullable = false, length = 11)
    private String phoneNumber;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now().plusHours(8);

    @Column(nullable = false)
    private BigDecimal money = BigDecimal.ZERO;

    @Transient
    private Integer totalOrders;
    @Transient
    private Integer thisMonthOrders;
    @Transient
    private Double allTimerTotal;
}