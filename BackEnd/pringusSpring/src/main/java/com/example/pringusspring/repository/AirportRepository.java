package com.example.pringusspring.repository;

import com.example.pringusspring.model.Airport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AirportRepository extends MongoRepository<Airport, String> {

    @Query("{ 'name' : ?0 }")
    Optional<Airport> findByName(String name);

}
