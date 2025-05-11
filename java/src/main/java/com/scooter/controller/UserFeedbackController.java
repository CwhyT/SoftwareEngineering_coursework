package com.scooter.controller;


import com.scooter.entity.SendEmail;
import com.scooter.entity.UserCoupon;
import com.scooter.entity.UserFeedback;
import com.scooter.service.EmailService;
import com.scooter.service.IUserCouponService;
import com.scooter.service.IUserFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户问题反馈表 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/api/user-feedback")
public class UserFeedbackController {


    @Autowired
    private IUserFeedbackService userFeedbackService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/save")
    public ResponseEntity<?> save(UserFeedback userFeedback) {
        Map<String, Object> result = new HashMap<>();
        try {
            UserFeedback save = userFeedbackService.save(userFeedback);
            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/update")
    public ResponseEntity<?> update(UserFeedback userFeedback) {
        Map<String, Object> result = new HashMap<>();
        try {
            UserFeedback save = userFeedbackService.update(userFeedback);
            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/getInfo")
    public ResponseEntity<?> getInfo(UserFeedback userFeedback) {
        Map<String, Object> result = new HashMap<>();
        try {
            UserFeedback save = userFeedbackService.getInfo(userFeedback);
            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/delete")
    public ResponseEntity<?> delete(UserFeedback userFeedback) {
        Map<String, Object> result = new HashMap<>();
        try {
            userFeedbackService.delete(userFeedback);
//            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/getList")
    public ResponseEntity<?> getList(UserFeedback userFeedback) {
        Map<String, Object> result = new HashMap<>();
        try {
            List<UserFeedback> list = userFeedbackService.getList(userFeedback);
            result.put("data", list);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<?> getList(@RequestBody SendEmail sendEmail) {
        return ResponseEntity.ok(emailService.sendMessage(sendEmail));
    }
}
