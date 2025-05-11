package com.scooter.controller;

import com.scooter.entity.Store;
import com.scooter.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreRepository storeRepository;

    @GetMapping("getList")
    public ResponseEntity<?> getAllList() {
        return ResponseEntity.ok(storeRepository.findAll());
    }

    @GetMapping()
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(storeRepository.findAll());
    }

    @GetMapping("save")
    public ResponseEntity<?> getAllStores(Store store) {
        return ResponseEntity.ok(storeRepository.save(store));
    }

    @GetMapping("update")
    public ResponseEntity<?> update(Store store) {
        return ResponseEntity.ok(storeRepository.save(store));
    }

    @GetMapping("delete")
    public ResponseEntity<?> delete(Store store) {
        storeRepository.deleteById(store.getStoreId());
        return ResponseEntity.ok(store);
    }

    @GetMapping("getInfo")
    public ResponseEntity<?> getInfo(Store store) {
        Optional<Store> byId = storeRepository.findById(store.getStoreId());
        return ResponseEntity.ok(byId.get());
    }
}