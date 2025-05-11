package com.scooter.controller;

import com.scooter.entity.Order;
import com.scooter.entity.User;
import com.scooter.repository.OrderRepository;
import com.scooter.repository.UserRepository;
import com.scooter.service.OrderService;
import com.scooter.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            // 获取当前登录用户
//            User currentUser = userService.getCurrentUser();
//            if (currentUser == null) {
//                return ResponseEntity.badRequest().body("请先登录");
//            }
            // 验证必要参数
            if (order.getRentHours() == null) {
                return ResponseEntity.badRequest().body("请指定租借时长");
            }
            if (order.getRentHours() <= 0) {
                return ResponseEntity.badRequest().body("租借时长必须大于0");
            }
            if (order.getScooterId() == null || order.getScooterId().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("请选择滑板车");
            }

            // 设置用户信息
            Optional<User> byId = userRepository.findById(Long.valueOf(order.getLoginId()));
            order.setUser(byId.get());
            logger.info("创建订单，用户ID: {}, 滑板车ID: {}, 租借时长: {}小时",
                    byId.get().getUserId(),
                    order.getScooterId(),
                    order.getRentHours());
            Order createdOrder = orderService.createOrder(order);
            return ResponseEntity.ok(createdOrder);
        } catch (Exception e) {
            logger.error("租车失败: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/delete")
    public ResponseEntity<?> delete(Order order) {
        Optional<Order> orderById = orderService.getOrderById(order.getOrderId());
        Optional<User> byId = userRepository.findById(orderById.get().getUserId());
        byId.get().setMoney(byId.get().getMoney().add(BigDecimal.valueOf(orderById.get().getTotalAmount())));
        orderRepository.deleteById(order.getOrderId());
        return ResponseEntity.ok(byId.get());
    }


    @GetMapping("/getAllList")
    public ResponseEntity<?> getAllList(Order order) {
        return orderService.getAllList(order);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/scooter/{scooterId}")
    public ResponseEntity<List<Order>> getOrdersByScooterId(@PathVariable String scooterId) {
        return ResponseEntity.ok(orderService.getOrdersByScooterId(scooterId));
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            Order updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/report")
    public ResponseEntity<?> report(@RequestParam("type") Integer type) {
        return ResponseEntity.ok(orderService.report(type));
    }

    @PostMapping("/{orderId}/end")
    public ResponseEntity<?> endOrder(@PathVariable Long orderId) {
        try {
            Order endedOrder = orderService.endOrder(orderId);
            return ResponseEntity.ok(endedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{orderId}/amount")
    public ResponseEntity<?> calculateOrderAmount(@PathVariable Long orderId) {
        try {
            double amount = orderService.calculateOrderAmount(orderId);
            return ResponseEntity.ok(Map.of("amount", amount));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}