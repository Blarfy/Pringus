package com.example.pringusspring.controller;

import com.example.pringusspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserRESTController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getAll")
    public String getAll() {
        return userRepository.findAll().toString();
    }

    @GetMapping("/getByUsername/{username}")
    public String getByUsername(@PathVariable String username) {
        return userRepository.findOneByUsername(username).toString();
    }
}
