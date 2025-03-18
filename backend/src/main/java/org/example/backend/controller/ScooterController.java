package org.example.backend.controller;

import org.example.backend.pojo.Scooter;
import org.example.backend.service.ScooterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/scooters")
public class ScooterController {

    @Autowired
    private ScooterService scooterService;

    @GetMapping
    public List<Scooter> getAllScooters() {
        return scooterService.getAllScooters();
    }

    @GetMapping("/{id}")
    public Optional<Scooter> getScooterById(@PathVariable Long id) {
        return scooterService.getScooterById(id);
    }

    @PostMapping
    public Scooter createScooter(@RequestBody Scooter scooter) {
        return scooterService.saveScooter(scooter);
    }

    @DeleteMapping("/{id}")
    public void deleteScooter(@PathVariable Long id) {
        scooterService.deleteScooter(id);
    }
}
