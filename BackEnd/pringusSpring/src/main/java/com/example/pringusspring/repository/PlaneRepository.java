package com.example.pringusspring.repository;

import com.example.pringusspring.model.Plane;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PlaneRepository extends MongoRepository<Plane, String> {
    @Query("{ 'name' : ?0 }")
    public List<Plane> findByName(String name);
}
