package com.example.pringusspring.controller;

import com.example.pringusspring.service.MyUserDetailsService;
import com.example.pringusspring.model.Ticket;
import com.example.pringusspring.model.User;
import com.example.pringusspring.repository.TicketRepository;
import com.example.pringusspring.repository.UserRepository;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserRESTController {
    private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(UserRESTController.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getByUserID(@PathVariable String userId) {
        User user = userRepository.findByUserID(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @GetMapping("/getByUserID/{userId}/tickets")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Page<Ticket>> getTicketsByUserId(@PathVariable String userId, @RequestParam Optional<Integer> page) {
        int pageP = page.orElse(0);
        User user = userRepository.findByUserID(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (user != null) {
            Pageable p = PageRequest.of(pageP, 10);
            Page<Ticket> tickets = ticketRepository.findTicketsByUser_Id(user.getId(), p);
            return new ResponseEntity<>(tickets, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @PutMapping("/updateUser/{userId}")
    public void updateUser(@PathVariable String userId, @RequestBody ObjectNode objectNode) {
        User user;
        String[] ticketIds;
        LOGGER.info("Request body: " + objectNode.toString());
        //public User (String email, String password, String firstName, String lastName, String role, String userID, String username, String[] tickets)
        ArrayNode arrayNode = (ArrayNode) objectNode.get("tickets");
        ticketIds = new String[arrayNode.size()];
        for (int i = 0; i < arrayNode.size(); i++) {
            ticketIds[i] = arrayNode.get(i).asText();
        }
        user = new User(objectNode.get("user").get("email").asText(),
                objectNode.get("user").get("password").asText(),
                objectNode.get("user").get("firstName").asText(),
                objectNode.get("user").get("lastName").asText(),
                objectNode.get("user").get("role").asText(),
                objectNode.get("user").get("userID").asText(),
                objectNode.get("user").get("username").asText());

        User userExists = userRepository.findByUserID(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if(userExists != null){
            userExists.setTickets(List.of(ticketIds));
            userExists.setEmail(user.getEmail());
            userExists.setPassword(passwordEncoder.encode(user.getPassword()));
            userExists.setFirstName(user.getFirstName());
            userExists.setLastName(user.getLastName());
            userExists.setRole(user.getRole());
            userExists.setUserID(user.getUserID());
            userExists.setUsername(user.getUsername());
            userDetailsService.saveUser(userExists);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
