package com.example.pringusspring.repository;

import com.example.pringusspring.model.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface FlightRepository extends MongoRepository<Flight, String> {

    @Query("{ 'flightID' : ?0 }")
    public Optional<Flight> findOneByFlightID(String FlightID);

    //find all flights and sort by price by default
    public Page<Flight> findAllByOrderByPriceAsc(Pageable pageable);

    public Page<Flight> findAllByFlightInfo_Plane_Id(String planeId, Pageable pageable);

    public Page<Flight> findAllByOriginOrderByPriceAsc(String airportCode, Pageable pageable);

    public Page<Flight> findAllByDestinationOrderByPriceAsc(String airportCode, Pageable pageable);
}
