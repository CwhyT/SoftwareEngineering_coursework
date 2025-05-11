package com.scooter.service.impl;

import com.scooter.entity.Order;
import com.scooter.entity.User;
import com.scooter.repository.OrderRepository;
import com.scooter.repository.UserRepository;
import com.scooter.service.UserService;
import com.scooter.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    @Autowired
    private OrderRepository orderRepository;

    public UserServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public User register(User user) {
        logger.info("开始注册用户: {}", user.getUsername());

        // 检查用户名是否存在
        if (userRepository.existsByUsername(user.getUsername())) {
            logger.warn("用户名已存在: {}", user.getUsername());
            throw new RuntimeException("用户名已存在");
        }

        // 检查邮箱是否存在
        if (userRepository.existsByEmail(user.getEmail())) {
            logger.warn("邮箱已被注册: {}", user.getEmail());
            throw new RuntimeException("邮箱已被注册");
        }

        // 检查手机号是否存在
        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            logger.warn("手机号已被注册: {}", user.getPhoneNumber());
            throw new RuntimeException("手机号已被注册");
        }

        try {
            // 加密密码
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // 保存用户
            User savedUser = userRepository.save(user);
            logger.info("用户注册成功: {}", savedUser.getUsername());

            return savedUser;
        } catch (Exception e) {
            logger.error("用户注册失败: {}", e.getMessage(), e);
            throw new RuntimeException("注册失败: " + e.getMessage());
        }
    }

    @Override
    public Optional<User> login(String username, String password) {
        logger.info("尝试登录用户: {}", username);

        // 从数据库获取用户
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (!userOpt.isPresent()) {
            logger.warn("用户不存在: {}", username);
            return Optional.empty();
        }

        User user = userOpt.get();
        List<Order> all = orderRepository.findAll();
        List<Order> collect = all.stream().filter(e -> e.getUser().getUserId().equals(user.getUserId())).collect(Collectors.toList());
        double totalRentHours = collect.stream()
                .mapToDouble(Order::getRentHours)
                .filter(Objects::nonNull)// 提取 rentHours 并转为 double 流
                .sum();  // 求和
        user.setTotalOrders(collect.size());
        user.setAllTimerTotal(totalRentHours);
        // 验证密码
        if (!passwordEncoder.matches(password, user.getPassword())) {
            logger.warn("密码验证失败: {}", username);
            return Optional.empty();
        }

        logger.info("用户登录成功: {}", username);
        return Optional.of(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean sendVerificationEmail(String email) {
        return emailService.sendVerificationEmail(email);
    }

    @Override
    public boolean verifyEmail(String email, String code) {
        return emailService.verifyEmailCode(email, code);
    }

    @Override
    public User getCurrentUser() {
        // 临时返回数据库中的第一个用户，实际项目应根据token/session获取
        return userRepository.findAll().stream().findFirst().orElse(null);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        User currentUser = getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("用户未登录");
        }

        // 验证旧密码
        if (!passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            throw new RuntimeException("原密码错误");
        }

        // 加密新密码
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        currentUser.setPassword(encodedNewPassword);

        // 保存更新后的用户信息
        userRepository.save(currentUser);
    }

    @Override
    public List<User> getUserList() {
        List<User> userAll = userRepository.findAll();
        List<Order> all = orderRepository.findAll();
        userAll.forEach(r ->{
            List<Order> collect = all.stream().filter(e -> e.getUser().getUserId().equals(r.getUserId())).collect(Collectors.toList());
            double totalRentHours = collect.stream()
                    .mapToDouble(Order::getRentHours)
                    .filter(Objects::nonNull)// 提取 rentHours 并转为 double 流
                    .sum();  // 求和
            r.setTotalOrders(collect.size());
            r.setAllTimerTotal(totalRentHours);
        });


        return userAll;
    }
}