package com.example.pringusspring.controller;

import com.example.pringusspring.model.*;
import com.example.pringusspring.repository.AirportRepository;
import com.example.pringusspring.repository.FlightRepository;
import com.example.pringusspring.repository.PlaneRepository;
import com.example.pringusspring.util.SeatingConverter;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/Flights")
public class FlightRESTController {

    private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(FlightRESTController.class);
    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private PlaneRepository planeRepository;

    public FlightRESTController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @GetMapping("/getTopFlights")
    public ResponseEntity<Iterable<Flight>> getTopFlights(@RequestHeader Optional<Integer> page) {
        final int size = 20;
        int pageNumber = page.orElse(0);
        Pageable p = Pageable.ofSize(size).withPage(pageNumber);
        return new ResponseEntity<>(flightRepository.findAllByOrderByPriceAsc(p), HttpStatus.OK);
    }

    @GetMapping("/getFlightsByPlaneCode/{planeCode}")
    public ResponseEntity<Iterable<Flight>> getFlightsByPlaneCode(@PathVariable String planeCode, @RequestHeader Optional<Integer> page) {
        final int size = 20;
        String planeId = planeRepository.findPlaneByCode(planeCode).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plane not found")).getId();
        int pageNumber = page.orElse(0);
        Pageable p = Pageable.ofSize(size).withPage(pageNumber);
        return new ResponseEntity<>(flightRepository.findAllByFlightInfo_Plane_Id(planeId, p), HttpStatus.OK);
    }


//    @GetMapping("/getTopFlights/{airportCode}")
//    public ResponseEntity<Iterable<Flight>> getTopFlights(@PathVariable String airportCode) {
//        return ResponseEntity.ok(flightRepository.findTop20ByOriginOrderByPriceAsc(airportCode).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No flights found")));
//    }

    @GetMapping("/getAll")
    public String getAll() {
        return flightRepository.findAll().stream().count() + "";
    }

    @GetMapping("/getByFlightID/{flightId}")
    public ResponseEntity<?> getByName(@PathVariable String flightId) {
        Flight flight = flightRepository.findOneByFlightID(flightId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Flight Not Found"));
        String error = "Flight not found";
        return flight != null ? new ResponseEntity<>(flight, HttpStatus.OK) : new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updateFlight/{flightId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSOCIATE')")
    public ResponseEntity<Flight> updateFlight(@PathVariable String flightId, @RequestBody Flight updatedFlight) {
        Optional<Flight> optionalFlight = flightRepository.findOneByFlightID(flightId);
        ResponseEntity<Flight> responseEntity;

        if (optionalFlight.isPresent()) {
            Flight flight = optionalFlight.get();
            FlightInfo flightInfo = flight.getFlightInfo();
            FlightInfo updatedFlightInfo = updatedFlight.getFlightInfo();
            flight.setFlightID(updatedFlight.getFlightID());
            flight.setDestination(updatedFlight.getDestination());
            flight.setOrigin(updatedFlight.getOrigin());
            flight.setAirline(updatedFlight.getAirline());
            flight.setPrice(updatedFlight.getPrice());
            flight.setStatus(updatedFlight.getStatus());
            flightInfo.setDepartureTime(updatedFlightInfo.getDepartureTime());
            flightInfo.setArrivalTime(updatedFlightInfo.getArrivalTime());
            responseEntity = new ResponseEntity<>(flightRepository.save(flight), HttpStatus.OK);
        }else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @PutMapping("/updateFlightPlane/{flightId}/{planeCode}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSOCIATE')")
    public ResponseEntity<Flight> updateFlightPlane(@PathVariable String flightId, @PathVariable String planeCode) {
        Optional<Flight> optionalFlight = flightRepository.findOneByFlightID(flightId);
        Optional<Plane> optionalPlane = planeRepository.findByCode(planeCode);
        ResponseEntity<Flight> responseEntity;

        if (optionalFlight.isPresent() && optionalPlane.isPresent()) {
            Flight flight = optionalFlight.get();
            FlightInfo flightInfo = flight.getFlightInfo();
            Plane plane = optionalPlane.get();
            FlightSeating flightSeating = new FlightSeating(
                    SeatingConverter.convert(plane.getBusiness()),
                    SeatingConverter.convert(plane.getEconomy()),
                    SeatingConverter.convert(plane.getFirst())
            );
            flightInfo.setPlane(plane);
            flightInfo.setSeating(flightSeating);

            responseEntity = new ResponseEntity<>(HttpStatus.ACCEPTED);
        }else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @PostMapping("/addFlight")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSOCIATE')")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
        if (flightRepository.findOneByFlightID(flight.getFlightID()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        FlightInfo flightInfo = flight.getFlightInfo();
        Plane plane = flightInfo.getPlane();
        flightInfo.setPlane(planeRepository.findByCode(plane.getCode()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Plane Not Found")));
        FlightSeating flightSeating = new FlightSeating(
                SeatingConverter.convert(flightInfo.getPlane().getBusiness()),
                SeatingConverter.convert(flightInfo.getPlane().getEconomy()),
                SeatingConverter.convert(flightInfo.getPlane().getFirst())
        );
        flightInfo.setSeating(flightSeating);
        flight.setFlightInfo(flightInfo);
        return new ResponseEntity<>(flightRepository.save(flight), HttpStatus.CREATED);
    }
}