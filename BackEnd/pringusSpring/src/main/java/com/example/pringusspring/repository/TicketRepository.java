package com.example.pringusspring.repository;

import com.example.pringusspring.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    @Query("{ 'flightID' : ?0 }")
    public Optional<Ticket> findByTicketID(String TicketID);

}
