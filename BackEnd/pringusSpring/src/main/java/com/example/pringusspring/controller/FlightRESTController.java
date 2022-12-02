package com.example.pringusspring.controller;

import com.example.pringusspring.repository.AirportRepository;
import com.example.pringusspring.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Flights")
public class FlightRESTController {

    @Autowired
    private FlightRepository flightRepository;

    public FlightRESTController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @GetMapping("/getAll")
    public String getAll() {
        return flightRepository.findAll().stream().count() + "";
    }

    @GetMapping("/getByFlightID/{flightId}")
    public String getByName(@PathVariable String flightId) {
        return flightRepository.findByFlightID(flightId).toString();
    }
}