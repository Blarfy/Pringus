package com.example.pringusspring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Flights")
public class Flight {
    @Id
    private String id;

    private String airline;
    private String destination;
    private String flightID;
    private String status;
    private String origin;
    private String price;
    @Field
    private FlightInfo flightInfo;

    public Flight() {
    }

    public Flight(String Airline, String Destination, String FlightID, String Status, String Origin, String Price, FlightInfo flightInfo) {
        this.airline = Airline;
        this.destination = Destination;
        this.flightID = FlightID;
        this.status = Status;
        this.origin = Origin;
        this.price = Price;
        this.flightInfo = flightInfo;
    }

    public FlightInfo getFlightInfo() {
        return flightInfo;
    }

    public void setFlightInfo(FlightInfo flightInfo) {
        this.flightInfo = flightInfo;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getFlightID() {
        return flightID;
    }

    public void setFlightID(String flightID) {
        this.flightID = flightID;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    // this to string method will output the object as a JSON string
    @Override
    public String toString() {
        return "{" +
                "\"Airline\":\"" + airline + "\"" +
                ", \"Destination\":\"" + destination + "\"" +
                ", \"FlightID\":\"" + flightID + "\"" +
                ", \"Status\":\"" + status + "\"" +
                ", \"FlightInfo\":" + flightInfo +
                ", \"Origin\":\"" + origin + "\"" +
                ", \"Price\":\"" + price + "\"" +
                '}';
    }


}
