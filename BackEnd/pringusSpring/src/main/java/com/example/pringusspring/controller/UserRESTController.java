package com.example.pringusspring.controller;

import com.example.pringusspring.model.Ticket;
import com.example.pringusspring.model.User;
import com.example.pringusspring.repository.TicketRepository;
import com.example.pringusspring.repository.UserRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserRESTController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/getAll")
    public String getAll() {
        return userRepository.findAll().toString();
    }

    @GetMapping("/getByUsername/{username}")
    public String getByUsername(@PathVariable String username) {
        return userRepository.findOneByUsername(username).toString();
    }

    @GetMapping("/getByUserID/{userId}")
    public String getByUserID(@PathVariable String userId) {
        return userRepository.findByUserId(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).toString();
    }

    @PutMapping("/updateUser/{userId}")
    public void updateUser(@PathVariable String userId, @RequestBody ObjectNode objectNode) {
        User user;
        String[] ticketIds;
        try {
            user = objectNode.get("user").traverse().readValueAs(User.class);
            ticketIds = objectNode.get("ticketIds").traverse().readValueAs(String[].class);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user");
        }
        User userExists = userRepository.findByUserId(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if(userExists != null){
            List<Ticket> tickets = ticketRepository.findAllById(List.of(ticketIds));
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
