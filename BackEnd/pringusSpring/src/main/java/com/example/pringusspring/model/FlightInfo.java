package com.example.pringusspring.model;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;


import java.util.Date;

public class FlightInfo {
    @DBRef(lazy = true)
    private Plane plane;
    @Field
    private Date departureTime;
    @Field
    private Date arrivalTime;
    @Field
    private FlightSeating seating;

    public FlightInfo() {
    }

    public FlightInfo(Plane plane, Date departureTime, Date arrivalTime, FlightSeating seating) {
        this.plane = plane;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.seating = seating;
    }

    public Plane getPlane() {
        return plane;
    }

    public void setPlane(Plane plane) {
        this.plane = plane;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }

    public Date getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Date arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public FlightSeating getSeating() {
        return seating;
    }

    public void setSeating(FlightSeating seating) {
        this.seating = seating;
    }
}
