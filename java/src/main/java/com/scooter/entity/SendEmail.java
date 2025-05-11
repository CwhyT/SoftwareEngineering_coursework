package com.scooter.entity;

import lombok.Data;

@Data
public class SendEmail extends UserHandler{
    private String email;
    private String message;

    private Integer userFeedbackId;
}
