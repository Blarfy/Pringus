package com.example.pringusspring.repository;

import com.example.pringusspring.model.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FlightRepository extends MongoRepository<Flight, String> {

    @Query("{ 'flightID' : ?0 }")
    public Optional<Flight> findOneByFlightID(String FlightID);
}
