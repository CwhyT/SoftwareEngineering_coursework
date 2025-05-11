package com.scooter.repository;

import com.scooter.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderId(String orderId);

    List<Order> findByUser_UserId(Long userId);

    List<Order> findByScooterId(String scooterId);

    List<Order> findByStatus(String status);
}