package com.example.pringusspring.controller;

import com.example.pringusspring.model.Ticket;
import com.example.pringusspring.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/tickets")
public class TicketRESTController {

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/getAllTickets")
    public String getAllTickets() {
        return ticketRepository.findAll().size() + "";
    }

    @GetMapping("/getTicket/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String id) {
        Ticket ticket = ticketRepository.findByTicketID(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        if (ticket != null) {
            return new ResponseEntity<>(ticket, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found");
        }
    }

    @PostMapping("/createTicket")
    public String createTicket(@RequestBody Ticket ticket) {
        ticket.setTicketID(ticketRepository.findAll().size() + 1);
        ticketRepository.save(ticket);
        return ticket.getTicketID();
    }
}
