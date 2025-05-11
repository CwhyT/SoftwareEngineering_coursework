package com.scooter.controller;

import com.scooter.entity.Scooter;
import com.scooter.entity.Store;
import com.scooter.repository.ScooterRepository;
import com.scooter.service.ScooterService;
import com.scooter.service.impl.ScooterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scooters")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ScooterController {

    @Autowired
    private ScooterService scooterService;

    @Autowired
    private ScooterRepository scooterRepository;

    @GetMapping
    public ResponseEntity<List<Scooter>> getAllScooters() {
        return ResponseEntity.ok(scooterService.getAllScooters());
    }

    @GetMapping("/{scooterId}")
    public ResponseEntity<?> getScooterById(@PathVariable String scooterId) {
        return scooterService.getScooterById(scooterId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/save")
    public ResponseEntity<?> save(Scooter scooter) {
        if (scooter.getStore() == null) {
            scooter.setStore(new Store());
        }
        scooter.getStore().setStoreId(scooter.getStoreId());
        return ResponseEntity.ok(scooterRepository.save(scooter));
    }

    @GetMapping("/update")
    public ResponseEntity<?> update(Scooter scooter) {
        scooter.getStore().setStoreId(scooter.getStoreId());
        return ResponseEntity.ok(scooterRepository.save(scooter));
    }

    @GetMapping("/delete")
    public ResponseEntity<?> delete(Scooter scooter) {
        scooterRepository.deleteById(scooter.getScooterId());
        return ResponseEntity.ok(null);
    }

    @GetMapping("/getInfo")
    public ResponseEntity<?> getInfo(Scooter scooter) {
        return ResponseEntity.ok(scooterRepository.findById(scooter.getScooterId()));
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<Scooter>> getScootersByShopId(@PathVariable String shopId) {
        return ResponseEntity.ok(scooterService.getScootersByShopId(shopId));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Scooter>> getAvailableScooters() {
        return ResponseEntity.ok(scooterService.getAvailableScooters());
    }


    @GetMapping("/getAllLsit")
    public ResponseEntity<List<Scooter>> getAllLsit(Scooter scooter) {
        return ResponseEntity.ok(scooterService.getAllLsit(scooter));
    }

    @PutMapping("/{scooterId}/status")
    public ResponseEntity<?> updateScooterStatus(
            @PathVariable String scooterId,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            Scooter updatedScooter = scooterService.updateScooterStatus(scooterId, status);
            return ResponseEntity.ok(updatedScooter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 