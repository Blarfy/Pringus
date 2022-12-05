package com.example.pringusspring.repository;

import com.example.pringusspring.model.Plane;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PlaneRepository extends MongoRepository<Plane, String> {
    @Query("{ 'name' : ?0 }")
    public Optional<Plane> findByName(String name);

    @Query("{ 'code' : ?0 }")
    public Optional<Plane> findByCode(String code);
}
