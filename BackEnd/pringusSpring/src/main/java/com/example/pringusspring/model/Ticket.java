package com.example.pringusspring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Tickets")
public class Ticket {
    @Id
    private String id;
    private String ticketID;
    private String seatClass;
    @DBRef
    private Flight flight;
    private String seat;
    @DBRef
    private User user;
    public Ticket() {
    }

    public Ticket(String seatClass, Flight flight, String seat, User user) {
        this.seatClass = seatClass;
        this.flight = flight;
        this.seat = seat;
        this.user = user;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTicketID() {
        return ticketID;
    }

    public void setTicketID(int ticketID) {
        this.ticketID = "PR" + String.format("%04d", ticketID);
    }

    // this returns a json representation of the object

    @Override
    public String toString() {
        return "{ \"seatClass\": \"" + seatClass
                + "\", \"flightID\": \"" + flight
                + "\", \"seat\": \"" + seat
                + "\", \"user\": \"" + user
                + "\" }";
    }


}
