package com.example.pringusspring.repository;

import com.example.pringusspring.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    public Optional<Ticket> findByTicketID(String TicketID);

    public Page<Ticket> findTicketsByUser_Id(String userID, Pageable pageable);

}
