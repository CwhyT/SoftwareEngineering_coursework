package com.scooter.service;

import com.scooter.entity.SendEmail;

public interface EmailService {
    boolean sendVerificationEmail(String email);

    boolean verifyEmailCode(String email, String code);

    Boolean sendMessage(SendEmail sendEmail);
}
