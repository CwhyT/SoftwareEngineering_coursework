package com.scooter.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "user_feedback")
public class UserFeedback extends UserHandler implements Serializable {

    private static final long serialVersionUID = 1L;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;

    //用户ID
    private Integer userId;

    //反馈状态：0-未处理，1-处理中，2-已处理
    private Integer status;

    //反馈内容
    private String content;

    //反馈类型（如：功能建议、BUG报告、使用问题等）
    private String type;

    //反馈邮箱
    private String email;

    //反馈图片URL，多个图片用逗号分隔
    private String images;

    //反馈响应状态：0-未响应，1-已响应
    private Integer responseStatus;

    //反馈响应内容
    private String responseContent;

    //创建时间
    private LocalDateTime createTime;

    //更新时间
    private LocalDateTime updateTime;

    //响应时间
    private LocalDateTime responseTime;

    //处理管理员ID
    private Integer adminId;


}
