package com.example.pringusspring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Planes")
public class Plane {
    @Id
    private String id;

    private Seating business;
    private Seating economy;
    private Seating first;
    private String name;
    private String code;

    public Plane() {
    }

    public Plane(Seating business, Seating economy, Seating first, String name, String code) {
        this.business = business;
        this.economy = economy;
        this.first = first;
        this.name = name;
        this.code = code;
    }

    public Seating getBusiness() {
        return business;
    }

    public void setBusiness(Seating business) {
        this.business = business;
    }

    public Seating getEconomy() {
        return economy;
    }

    public void setEconomy(Seating economy) {
        this.economy = economy;
    }

    public Seating getFirst() {
        return first;
    }

    public void setFirst(Seating first) {
        this.first = first;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    //returns a json representation of the object
    @Override
    public String toString(){
        return "{ "+ (business != null ? "\"business\": " + business.toString() + ", " : "" ) + "\"economy\": " + economy.toString() + ", " + (first != null ? "\"first\": " + first.toString() + ", " : "" )+ " \"name\": \"" + name + "\", \"code\": \"" + code + "\" }";
    }



}
