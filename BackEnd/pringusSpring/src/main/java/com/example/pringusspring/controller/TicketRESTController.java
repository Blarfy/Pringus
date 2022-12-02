package com.example.pringusspring.controller;

import com.example.pringusspring.model.Ticket;
import com.example.pringusspring.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/createTicket")
    public String createTicket(@RequestBody Ticket ticket) {
        ticket.setTicketID(ticketRepository.findAll().size() + 1);
        ticketRepository.save(ticket);
        return ticket.getTicketID();
    }
}
