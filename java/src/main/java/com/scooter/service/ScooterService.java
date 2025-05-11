package com.scooter.service;

import com.scooter.entity.Scooter;
import java.util.List;
import java.util.Optional;

public interface ScooterService {
    List<Scooter> getAllScooters();
    Optional<Scooter> getScooterById(String scooterId);
    List<Scooter> getScootersByShopId(String shopId);
    List<Scooter> getAvailableScooters();
    Scooter updateScooterStatus(String scooterId, String status);
    Scooter saveScooter(Scooter scooter);

    List<Scooter> getAllLsit(Scooter scooter);

}