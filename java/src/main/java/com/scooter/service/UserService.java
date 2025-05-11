package com.scooter.service;

import com.scooter.entity.User;

import java.util.List;
import java.util.Optional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import javax.servlet.http.HttpServletRequest;

public interface UserService {
    User register(User user);

    Optional<User> login(String username, String password);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    User updateUser(User user);

    boolean sendVerificationEmail(String email);

    boolean verifyEmail(String email, String code);

    User getCurrentUser();

    void changePassword(String oldPassword, String newPassword);

    List<User> getUserList();

}