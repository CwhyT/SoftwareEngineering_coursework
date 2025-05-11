package com.scooter.controller;

import com.scooter.entity.User;
import com.scooter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // 添加日志记录接收到的数据
            logger.info("接收到注册请求数据: username={}, email={}, phoneNumber={}, birthDate={}",
                    user.getUsername(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getBirthDate());

            // 验证必填字段
            if (user.getPhoneNumber() == null || user.getPhoneNumber().trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "电话号码不能为空");
                return ResponseEntity.badRequest().body(error);
            }

            if (user.getBirthDate() == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "出生日期不能为空");
                return ResponseEntity.badRequest().body(error);
            }

            User registeredUser = userService.register(user);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "注册成功");
            response.put("user", registeredUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("注册失败: {}", e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            var userOpt = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            if (userOpt.isPresent()) {
                // 生成token（如无JWT可用UUID代替）
                String token = java.util.UUID.randomUUID().toString();
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("token", token);
                response.put("user", userOpt.get());
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "用户名或密码错误");
                return ResponseEntity.ok(error);
            }
        } catch (Exception e) {
            logger.error("登录失败: {}", e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.ok(error);
        }
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        boolean exists = userService.findByUsername(username).isPresent();
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        boolean exists = userService.findByEmail(email).isPresent();
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/check-phone/{phoneNumber}")
    public ResponseEntity<?> checkPhone(@PathVariable String phoneNumber) {
        boolean exists = userService.findByPhoneNumber(phoneNumber).isPresent();
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/send-email-code")
    public ResponseEntity<?> sendEmailCode(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "邮箱不能为空");
                return ResponseEntity.badRequest().body(error);
            }

            boolean sent = userService.sendVerificationEmail(email);
            Map<String, Object> response = new HashMap<>();
            response.put("success", sent);
            response.put("message", sent ? "验证码已发送" : "验证码发送失败");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("发送验证码失败: {}", e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "发送验证码失败，请稍后重试");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String code = request.get("code");

            if (email == null || code == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "邮箱和验证码不能为空");
                return ResponseEntity.badRequest().body(error);
            }

            boolean verified = userService.verifyEmail(email, code);
            Map<String, Object> response = new HashMap<>();
            response.put("success", verified);
            response.put("message", verified ? "邮箱验证成功" : "验证码错误或已过期");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("验证邮箱失败: {}", e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "验证失败，请稍后重试");
            return ResponseEntity.badRequest().body(error);
        }
    }
}

class LoginRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}