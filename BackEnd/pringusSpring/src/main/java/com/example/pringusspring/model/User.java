package com.example.pringusspring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.Query;

import java.util.Arrays;
import java.util.List;

@Document(collection = "Users")
public class User {
    @Id
    private String id;

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    @DBRef
    private List<Ticket> tickets;
    private String userID;
    private String username;

    public User() {
    }

    public User(String email, String password, String firstName, String lastName, String role, List<Ticket> tickets, String userID, String username) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.tickets = tickets;
        this.userID = userID;
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        if(role.equals("ADMIN") || role.equals("ASSOCIATE") || role.equals("CUSTOMER")) {
            this.role = role;
        }
        else {
            this.role = "CUSTOMER";
        }
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    //this to string method returns a json string of the object
    @Override
    public String toString() {
        return "{" +
                "\"id\":\"" + id + '\"' +
                ", \"email\":\"" + email + '\"' +
                ", \"password\":\"" + password + '\"' +
                ", \"firstName\":\"" + firstName + '\"' +
                ", \"lastName\":\"" + lastName + '\"' +
                ", \"role\":\"" + role + '\"' +
                ", \"tickets\":" + tickets.toString() +
                ", \"userID\":\"" + userID + '\"' +
                ", \"username\":\"" + username + '\"' +
                '}';
    }
}
