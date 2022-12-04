package com.example.pringusspring.model;

import org.bson.json.JsonObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Flights")
public class Flight {
    @Id
    private String id;

    private String Airline;
    private String Destination;
    private String FlightID;
    private String Status;
    private FlightInfo FlightInfo;
    private String Origin;
    private String Price;

    public Flight() {
    }

    public Flight(String Airline, String Destination, String FlightID, String Status, FlightInfo FlightInfo, String Origin, String Price) {
        this.Airline = Airline;
        this.Destination = Destination;
        this.FlightID = FlightID;
        this.Status = Status;
        this.FlightInfo = FlightInfo;
        this.Origin = Origin;
        this.Price = Price;
    }

    public String getAirline() {
        return Airline;
    }

    public void setAirline(String airline) {
        Airline = airline;
    }

    public String getDestination() {
        return Destination;
    }

    public void setDestination(String destination) {
        Destination = destination;
    }

    public String getFlightID() {
        return FlightID;
    }

    public void setFlightID(String flightID) {
        FlightID = flightID;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public FlightInfo getFlightInfo() {
        return FlightInfo;
    }

    public void setFlightInfo(FlightInfo flightInfo) {
        FlightInfo = flightInfo;
    }

    public String getOrigin() {
        return Origin;
    }

    public void setOrigin(String origin) {
        Origin = origin;
    }

    public String getPrice() {
        return Price;
    }

    public void setPrice(String price) {
        Price = price;
    }

    // this to string method will output the object as a JSON string
    @Override
    public String toString() {
        return "{" +
                "\"Airline\":\"" + Airline + "\"" +
                ", \"Destination\":\"" + Destination + "\"" +
                ", \"FlightID\":\"" + FlightID + "\"" +
                ", \"Status\":\"" + Status + "\"" +
                ", \"FlightInfo\":" + FlightInfo +
                ", \"Origin\":\"" + Origin + "\"" +
                ", \"Price\":\"" + Price + "\"" +
                '}';
    }


}
