package com.example.pringusspring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Airports")
public class Airport {
    @Id
    private String id;

    private String city;
    private String state;
    private String country;
    private String name;
    private String code;

    public Airport() {
    }

    public Airport(String city, String state, String country, String name, String code) {
        this.city = city;
        this.state = state;
        this.country = country;
        this.name = name;
        this.code = code;
    }

    public String getId() {
        return id;
    }


    public void setId(String id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
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

    // this to string method will output the object as a JSON string
    @Override
    public String toString(){
        return "{ \"id\": \"" + id
                + "\", \"city\": \"" + city
                + "\", \"state\": \"" + state
                + "\", \"country\": \"" + country
                + "\", \"name\": \"" + name
                + "\", \"code\": \"" + code
                + "\" }";
    }
}
