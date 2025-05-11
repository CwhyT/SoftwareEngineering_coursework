package com.scooter.controller;

import com.scooter.entity.User;
import com.scooter.repository.UserRepository;
import com.scooter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

import com.scooter.entity.Order;
import com.scooter.repository.OrderRepository;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam(value = "loginId", required = false) Integer loginId) {
        User user = userService.getCurrentUser();
        if (loginId != null){
            Optional<User> byId = userRepository.findById(Long.valueOf(loginId));
            user = byId.get();
        }
        List<Order> all = orderRepository.findAll();
        User finalUser = user;
        List<Order> collect = all.stream().filter(e -> e.getUser().getUserId().equals(finalUser.getUserId())).collect(Collectors.toList());
        double totalRentHours = collect.stream()
                .mapToDouble(Order::getRentHours)
                .filter(Objects::nonNull)// 提取 rentHours 并转为 double 流
                .sum();  // 求和
        user.setTotalOrders(collect.size());
        user.setAllTimerTotal(totalRentHours);
        if (user == null)
            return ResponseEntity.ok().body(null);
        Map<String, Object> result = new HashMap<>();
        result.put("username", user.getUsername());
        result.put("email", user.getEmail());
        result.put("totalOrders", user.getTotalOrders());
        result.put("allTimerTotal", user.getAllTimerTotal());
        result.put("phoneNumber", user.getPhoneNumber());
        result.put("birthDate", user.getBirthDate());
        result.put("money", user.getMoney());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getUserList")
    public ResponseEntity<?> getUserList(User dto) {
        List<User> user = userService.getUserList();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwords) {
        String oldPassword = passwords.get("oldPassword");
        String newPassword = passwords.get("newPassword");
        Map<String, Object> result = new HashMap<>();
        try {
            userService.changePassword(oldPassword, newPassword);
            result.put("success", true);
            result.put("message", "密码修改成功");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/recharge")
    public ResponseEntity<?> recharge(@RequestParam(value = "loginId") Integer loginId, @RequestParam("money")BigDecimal money) {
        Optional<User> byId = userRepository.findById(Long.valueOf(loginId));
        User user = byId.get();
        if(user.getMoney() == null) {
            user.setMoney(BigDecimal.ZERO);
        }
        user.setMoney(byId.get().getMoney().add(money));
        userRepository.save(byId.get());
        return ResponseEntity.ok(Map.of("success", true, "message", "充值成功"));
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getUserOrders(@RequestParam(value = "loginId") Integer loginId) {
        User user = userService.getCurrentUser();
        System.out.println("当前登录用户: " + (user == null ? "null" : user.getUserId()));
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "未登录"));
        }
        List<Order> orders = orderRepository.findByUser_UserId(Long.valueOf(loginId));
        System.out.println("查到的订单数量: " + orders.size());

        // 按创建时间升序排序（越晚的排在越上面）
        orders.sort((o1, o2) -> {
            if (o1.getCreatedAt() == null)
                return 1;
            if (o2.getCreatedAt() == null)
                return -1;
            return o1.getCreatedAt().compareTo(o2.getCreatedAt());
        });

        // 打印每个订单的详细信息
        orders.forEach(order -> {
            System.out.println("订单详细信息: " +
                    "ID: " + order.getOrderId() +
                    ", 开始时间: " + order.getStartTime() +
                    ", 结束时间: " + order.getEndTime() +
                    ", 创建时间: " + order.getCreatedAt() +
                    ", 状态: " + order.getStatus());
        });

        List<Map<String, Object>> result = orders.stream().map(order -> {
            Map<String, Object> map = new HashMap<>();
            map.put("orderId", order.getOrderId());
            map.put("createdAt", order.getCreatedAt());
            map.put("totalAmount", order.getTotalAmount());
            map.put("status", order.getStatus());
            map.put("startTime", order.getStartTime() != null ? order.getStartTime().toString() : null);
            map.put("endTime", order.getEndTime() != null ? order.getEndTime().toString() : null);

            // 打印转换后的数据
            System.out.println("转换后的订单数据: " + map);

            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(Map.of("success", true, "data", result));
    }
}