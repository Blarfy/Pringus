package com.example.pringusspring.repository;

import com.example.pringusspring.model.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FlightRepository extends MongoRepository<Flight, String> {

    @Query("{ 'FlightID' : ?0 }")
    public List<Flight> findByFlightID(String FlightID);
}
