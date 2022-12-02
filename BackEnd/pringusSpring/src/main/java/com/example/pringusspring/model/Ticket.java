package com.example.pringusspring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Tickets")
public class Ticket {
    @Id
    private String id;
    private String seatClass;
    private String flightID;
    private String seat;
    private String user;

    public Ticket() {
    }

    public Ticket(String seatClass, String flightID, String seat, String user) {
        this.seatClass = seatClass;
        this.flightID = flightID;
        this.seat = seat;
        this.user = user;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public String getFlightID() {
        return flightID;
    }

    public void setFlightID(String flightID) {
        this.flightID = flightID;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    // this returns a json representation of the object

    @Override
    public String toString() {
        return "{ \"seatClass\": \"" + seatClass
                + "\", \"flightID\": \"" + flightID
                + "\", \"seat\": \"" + seat
                + "\", \"user\": \"" + user
                + "\" }";
    }

}
