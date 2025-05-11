package com.scooter.repository;

import com.scooter.entity.Scooter;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ScooterRepository extends JpaRepository<Scooter, Long> {
    List<Scooter> findByStore_StoreId(Long storeId);

    List<Scooter> findByStatus(String status);
}