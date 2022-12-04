package com.example.pringusspring.controller;

import com.example.pringusspring.model.Flight;
import com.example.pringusspring.repository.AirportRepository;
import com.example.pringusspring.repository.FlightRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@RequestMapping("/Flights")
public class FlightRESTController {

    @Autowired
    private FlightRepository flightRepository;

    private final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(FlightRESTController.class);

    public FlightRESTController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @GetMapping("/getAll")
    public String getAll() {
        return flightRepository.findAll().stream().count() + "";
    }

    @GetMapping("/getByFlightID/{flightId}")
    public String getByName(@PathVariable String flightId) {
        LOGGER.info("getByFlightID: " + flightId);
        Flight flight = flightRepository.findByFlightId(flightId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));
        if(flight!= null){
            return flight.toString();
        }else {
            LOGGER.info("getByFlightID: " + flightId + " not found");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found");
        }

    }

    @PutMapping("/updateFlight/{flightId}")
    public void updateFlight(@PathVariable String flightId, @RequestBody Flight flight) {
        Flight flightExists = flightRepository.findByFlightId(flightId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));
        if(flightExists != null) {
            flightRepository.save(flight);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found");
        }
    }
}