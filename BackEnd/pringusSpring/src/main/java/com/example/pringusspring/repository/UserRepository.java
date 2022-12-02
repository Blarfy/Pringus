package com.example.pringusspring.repository;

import com.example.pringusspring.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    public User findOneByUsername(String username);


}
