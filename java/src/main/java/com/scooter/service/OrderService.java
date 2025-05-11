package com.scooter.service;

import com.scooter.entity.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    Order createOrder(Order order);

    Optional<Order> getOrderById(Long orderId);

    List<Order> getOrdersByUserId(Long userId);

    List<Order> getOrdersByScooterId(String scooterId);

    Order updateOrderStatus(Long orderId, String status);

    Order endOrder(Long orderId);

    double calculateOrderAmount(Long orderId);

    ResponseEntity<?> getAllList(Order order);

    Object report(Integer type);


}