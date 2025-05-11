package com.scooter.service.impl;

import com.scooter.entity.SendEmail;
import com.scooter.entity.User;
import com.scooter.entity.UserFeedback;
import com.scooter.repository.UserFeedbackRepository;
import com.scooter.repository.UserRepository;
import com.scooter.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailServiceImpl implements EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    // 存储邮箱验证码的Map，key为邮箱，value为验证码
    private final Map<String, String> emailCodeMap = new ConcurrentHashMap<>();


    @Autowired
    private UserFeedbackRepository userFeedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean sendVerificationEmail(String email) {
        try {
            // 生成6位随机验证码
            String code = generateVerificationCode();

            // 存储验证码
            emailCodeMap.put(email, code);

            // 创建邮件消息
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("共享滑板租赁平台 <2767349769@qq.com>");
            message.setTo(email);
            message.setSubject("邮箱验证码");
            message.setText("您的验证码是: " + code + "\n验证码有效期为5分钟。");

            // 发送邮件
            mailSender.send(message);
            logger.info("验证码已发送到邮箱: {}", email);
            return true;
        } catch (Exception e) {
            logger.error("发送验证码失败: {}", e.getMessage(), e);
            return false;
        }
    }

    @Override
    public boolean verifyEmailCode(String email, String code) {
        String storedCode = emailCodeMap.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            // 验证成功后删除验证码
            emailCodeMap.remove(email);
            return true;
        }
        return false;
    }

    @Override
    public Boolean sendMessage(SendEmail sendEmail) {
        try {
            UserFeedback userFeedback = userFeedbackRepository.findById(sendEmail.getUserFeedbackId()).get();
            userFeedback.setResponseStatus(1);
            userFeedback.setStatus(2);
            User user = userRepository.findById(Long.valueOf(userFeedback.getUserId())).get();
            // 生成6位随机验证码
//            String code = generateVerificationCode();
            // 存储验证码
//            emailCodeMap.put(email, code);

            // 创建邮件消息
            SimpleMailMessage mess = new SimpleMailMessage();
            mess.setFrom("共享滑板租赁平台 <2767349769@qq.com>");
            mess.setTo(sendEmail.getEmail());
//            mess.setSubject("邮箱验证码");
            String message = "你好，"+user.getUsername()+"。我们收到您反馈的"+userFeedback.getContent()+"，"+sendEmail.getMessage();
            mess.setText(message);
            userFeedback.setResponseContent(message);
            // 发送邮件
            mailSender.send(mess);
            logger.info("反馈已发送到邮箱: {}", sendEmail.getEmail());
            userFeedback.setAdminId(sendEmail.getLoginId());
            userFeedbackRepository.save(userFeedback);
            return true;
        } catch (Exception e) {
            logger.error("发送反馈失败: {}", e.getMessage(), e);
            return false;
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}