package com.scooter.timer;


import com.scooter.entity.Order;
import com.scooter.entity.Scooter;
import com.scooter.repository.OrderRepository;
import com.scooter.repository.ScooterRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Configuration
@Slf4j
public class Timer {

    @Autowired
    private ScooterRepository scooterRepository;

    @Autowired
    private OrderRepository orderRepository;


    //每周一的凌晨1点执行
    @Scheduled(cron = "0 * * * * *")
    public void initializeProjectFollowUpTask() {
        log.info("定时任务开始执行");
        List<Order> all = orderRepository.findAll();
        List<Order> collect = all.stream()
                .filter(e -> e.getEndTime().isBefore(LocalDateTime.now()))
                .filter(e ->e.getStatus().equals("created"))
                .collect(Collectors.toList());
        if (!collect.isEmpty()){
            for (Order order : collect) {
                order.setStatus("close");
            }
            orderRepository.saveAll(collect);
            Set<Long> collect1 = collect.stream()
                    .map(Order::getScooterId)       // 获取 String 类型的 scooterId
                    .map(Long::parseLong)           // 转换为 Long（可能抛出 NumberFormatException）
                    .collect(Collectors.toSet());   // 收集为 Set<Long>
            List<Scooter> allById = scooterRepository.findAllById(collect1);
            allById.forEach(r ->{
                r.setStatus("available");
            });
            scooterRepository.saveAll(allById);
        }
        log.info("定时任务结束执行");
    }
}
