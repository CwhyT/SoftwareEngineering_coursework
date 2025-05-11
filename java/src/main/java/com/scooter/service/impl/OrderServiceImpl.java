package com.scooter.service.impl;

import com.scooter.entity.*;
import com.scooter.repository.OrderRepository;
import com.scooter.repository.ScooterRepository;
import com.scooter.repository.UserCouponRepository;
import com.scooter.repository.UserRepository;
import com.scooter.service.OrderService;
import com.scooter.service.ScooterService;
import com.scooter.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ScooterService scooterService;

    @Autowired
    private UserCouponRepository userCouponRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScooterRepository scooterRepository;

    @Override
    @Transactional
    public Order createOrder(Order order) {
        logger.info("开始创建订单，用户ID: {}, 滑板车ID: {}", order.getUser() != null ? order.getUser().getUserId() : "null",
                order.getScooterId());

        // 检查滑板车是否可用
        Scooter scooter = scooterService.getScooterById(order.getScooterId())
                .orElseThrow(() -> {
                    logger.error("滑板车不存在，ID: {}", order.getScooterId());
                    return new RuntimeException("滑板车不存在");
                });

        if (!"available".equals(scooter.getStatus())) {
            logger.error("滑板车不可用，ID: {}, 当前状态: {}", scooter.getScooterId(), scooter.getStatus());
            throw new RuntimeException("滑板车不可用");
        }

        // 确保user_id被设置
        if (order.getUser() == null) {
            logger.error("用户ID不能为空");
            throw new RuntimeException("用户ID不能为空");
        }

        // 验证租借时长
        if (order.getRentHours() == null || order.getRentHours() <= 0) {
            logger.error("租借时长无效: {}", order.getRentHours());
            throw new RuntimeException("租借时长必须大于0");
        }


        LocalDateTime now = LocalDateTime.now();
        if (order.getStartTime() == null){
            // 设置订单时间（使用北京时间）
            order.setStartTime(now);
        }
        if (order.getEndTime() == null){
            // 设置结束时间 = 开始时间 + 租借时长
            order.setEndTime(now.plusMinutes((long) (order.getRentHours() * 60)));
        }
        if (order.getOrderStartTime() != null && !order.getOrderStartTime().equals("")){
            order.setStartTime(LocalDateTime.parse(order.getOrderStartTime()));
        }
        if (order.getOrderEndTime() != null && !order.getOrderEndTime().equals("")){
            order.setEndTime(LocalDateTime.parse(order.getOrderEndTime()));
        }
        order.setStatus("created");

        // 计算订单金额（仅计算租借费用）
        double pricePerHour = scooter.getPricePerHour();
        double totalAmount = pricePerHour * order.getRentHours();
        order.setTotalAmount(totalAmount);
        User user = order.getUser();
        UserCoupon userCoupon = new UserCoupon();
        if (order.getCouponId() != null){
            userCoupon = userCouponRepository.findById(order.getCouponId()).get();
            user.setMoney(user.getMoney().add(userCoupon.getCouponAmount()).subtract(BigDecimal.valueOf(order.getTotalAmount())));
        }else {
            user.setMoney(user.getMoney().subtract(BigDecimal.valueOf(order.getTotalAmount())));
        }
        userRepository.save(user);
        logger.info("订单金额计算：每小时{}元，租借{}小时，总金额{}元",
                pricePerHour, order.getRentHours(), totalAmount);

        // 更新滑板车状态为in-use
        try {
            scooterService.updateScooterStatus(String.valueOf(scooter.getScooterId()), "in-use");
            logger.info("滑板车状态已更新为in-use，ID: {}", scooter.getScooterId());
        } catch (Exception e) {
            logger.error("更新滑板车状态失败，ID: {}, 错误: {}", scooter.getScooterId(), e.getMessage());
            throw new RuntimeException("更新滑板车状态失败");
        }

        try {
            Order savedOrder = orderRepository.save(order);
            if (order.getCouponId() != null){
                userCoupon.setStatus(1);
                userCoupon.setUseTime(LocalDateTime.now());
                userCoupon.setOrderId(String.valueOf(savedOrder.getOrderId()));
                userCoupon.setUseTime(LocalDateTime.now());
                userCouponRepository.save(userCoupon);
            }

            logger.info("订单创建成功，订单ID: {}, 开始时间: {}, 结束时间: {}, 租借时长: {}小时, 总金额: {}元",
                    savedOrder.getOrderId(),
                    savedOrder.getStartTime(),
                    savedOrder.getEndTime(),
                    savedOrder.getRentHours(),
                    savedOrder.getTotalAmount());
            return savedOrder;
        } catch (Exception e) {
            logger.error("保存订单失败，错误: {}", e.getMessage());
            throw new RuntimeException("保存订单失败");
        }
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUser_UserId(userId);
    }

    @Override
    public List<Order> getOrdersByScooterId(String scooterId) {
        return orderRepository.findByScooterId(scooterId);
    }

    @Override
    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        if (!"normal".equals(status) && !"cancel".equals(status)) {
            throw new RuntimeException("订单状态只能为normal或cancel");
        }
        if (status.equals("cancel")){
            Order order = orderRepository.findById(orderId).get();
            Scooter scooter = scooterRepository.findById(Long.valueOf(order.getScooterId())).get();
            scooter.setStatus("available");
            scooterRepository.save(scooter);
            Optional<User> byId = userRepository.findById(order.getUserId());
            byId.get().setMoney(byId.get().getMoney().add(BigDecimal.valueOf(order.getTotalAmount())));
            userRepository.save(byId.get());
        }
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setStatus(status);
                    // 如果取消订单，费用为0
                    if ("cancel".equals(status)) {
                        order.setTotalAmount(0.0);
                    }
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("订单不存在"));
    }

    @Override
    @Transactional
    public Order endOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    LocalDateTime endTime = LocalDateTime.now();
                    order.setEndTime(endTime);
                    order.setStatus("normal");

                    // 重新计算订单金额（仅计算租借费用）
                    Scooter scooter = scooterService.getScooterById(order.getScooterId())
                            .orElseThrow(() -> new RuntimeException("滑板车不存在"));

                    Duration duration = Duration.between(order.getStartTime(), endTime);
                    long actualHours = duration.toHours() + (duration.toMinutesPart() > 0 ? 1 : 0);
                    double totalAmount = scooter.getPricePerHour() * actualHours;
                    order.setTotalAmount(totalAmount);

                    logger.info("订单结束，实际使用{}小时，每小时{}元，总金额{}元",
                            actualHours, scooter.getPricePerHour(), totalAmount);

                    // 更新滑板车状态
                    scooterService.updateScooterStatus(String.valueOf(order.getScooterId()), "available");

                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("订单不存在"));
    }

    @Override
    public double calculateOrderAmount(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    if (order.getEndTime() == null) {
                        throw new RuntimeException("订单未结束");
                    }
                    if ("cancel".equals(order.getStatus())) {
                        return 0.0;
                    }
                    final Duration duration = Duration.between(order.getStartTime(), order.getEndTime());
                    final long hours = duration.toHours() + (duration.toMinutesPart() > 0 ? 1 : 0);
                    return scooterService.getScooterById(order.getScooterId())
                            .map(scooter -> scooter.getPricePerHour() * hours)
                            .orElseThrow(() -> new RuntimeException("滑板车不存在"));
                })
                .orElseThrow(() -> new RuntimeException("订单不存在"));
    }

    @Override
    public ResponseEntity<?> getAllList(Order order) {
        List<Order> all = orderRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @Override
    public Object report(Integer type) {
        List<Order> all = orderRepository.findAll();
        List<Order> collect = all.stream().filter(e -> !e.getStatus().equals("cancel")).collect(Collectors.toList());
        Map<String, List<Order>> ordersByDate = collect.stream()
                .collect(Collectors.groupingBy(
                        order -> order.getCreatedAt().toLocalDate().toString()
                ));
        List<Report> list = new ArrayList<>();
        if (type == 1){
            List<String> last7Days = DateUtils.getLast7Days();
            for (String last7Day : last7Days) {
                Report report = new Report();
                report.setKey(last7Day);
                List<Order> orders = ordersByDate.get(last7Day);
                if (orders != null){
                    double total = orders.stream()
                            .filter(e ->e.getTotalAmount() != null)
                            .mapToDouble(Order::getTotalAmount)
                            .sum();
                    report.setValue(BigDecimal.valueOf(total));
                }else {
                    report.setValue(BigDecimal.ZERO);
                }
                list.add(report);
            }

        }
        if (type == 2){
            List<String> lastMonth = DateUtils.getLastMonth();
            for (String last7Day : lastMonth) {
                Report report = new Report();
                report.setKey(last7Day);
                List<Order> orders = ordersByDate.get(last7Day);
                if (orders != null){
                    double total = orders.stream()
                            .filter(e ->e.getTotalAmount() != null)
                            .mapToDouble(Order::getTotalAmount)
                            .sum();
                    report.setValue(BigDecimal.valueOf(total));
                }else {
                    report.setValue(BigDecimal.ZERO);
                }
                list.add(report);
            }
        }
        return list;
    }
}