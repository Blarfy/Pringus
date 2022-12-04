package com.example.pringusspring.repository;

import com.example.pringusspring.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    public Optional<User> findOneByUsername(String username);

    @Query("{ 'userId' : ?0 }")
    public Optional<User> findByUserId(int userId);

}
