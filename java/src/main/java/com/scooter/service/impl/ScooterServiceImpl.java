package com.scooter.service.impl;

import com.scooter.entity.Scooter;
import com.scooter.entity.Store;
import com.scooter.repository.ScooterRepository;
import com.scooter.repository.StoreRepository;
import com.scooter.service.ScooterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ScooterServiceImpl implements ScooterService {

    @Autowired
    private ScooterRepository scooterRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Scooter> getAllScooters() {
        return scooterRepository.findAll();
    }

    @Override
    public Optional<Scooter> getScooterById(String id) {
        return scooterRepository.findById(Long.valueOf(id));
    }

    @Override
    public List<Scooter> getScootersByShopId(String shopId) {
        Long storeId = Long.valueOf(shopId);
        return scooterRepository.findByStore_StoreId(storeId);
    }

    @Override
    public List<Scooter> getAvailableScooters() {
        return scooterRepository.findByStatus("available");
    }

    @Override
    public Scooter updateScooterStatus(String id, String status) {
        return scooterRepository.findById(Long.valueOf(id))
                .map(scooter -> {
                    scooter.setStatus(status);
                    return scooterRepository.save(scooter);
                })
                .orElseThrow(() -> new RuntimeException("滑板车不存在"));
    }

    @Override
    public Scooter saveScooter(Scooter scooter) {
        return scooterRepository.save(scooter);
    }

    @Override
    public List<Scooter> getAllLsit(Scooter scooter) {
        return scooterRepository.findAll();
    }

}