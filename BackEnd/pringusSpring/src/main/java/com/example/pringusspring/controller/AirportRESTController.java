package com.example.pringusspring.controller;

import com.example.pringusspring.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/airport")
public class AirportRESTController {

    @Autowired
    private AirportRepository airportRepository;

    public AirportRESTController(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    @GetMapping("/getAll")
    public String getAll() {
        return airportRepository.findAll().stream().count() + "";
    }

    @GetMapping("/getByName/{name}")
    public String getByName(@PathVariable String name) {
        return airportRepository.findByName(name).toString();
    }
}
