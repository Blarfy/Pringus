package com.example.pringusspring.controller;

import com.example.pringusspring.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String getTicketById(@PathVariable String id) {
        return ticketRepository.findByTicketID(id).toString();
    }
}
