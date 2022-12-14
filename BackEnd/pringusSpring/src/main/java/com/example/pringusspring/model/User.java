package com.example.pringusspring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Unwrapped;

import java.util.List;

@Document(collection = "Users")
public class User {
    @Id
    @JsonIgnore
    private String id;

    private String email;
    //@JsonIgnore
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    private List<String> tickets;
    private String userID;
    private String username;

    public User() {
    }



    public User (String email, String password, String firstName, String lastName, String role, String userID, String username) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.userID = userID;
        this.username = username;
    }

    public User(String email, String password, String firstName, String lastName, String role, List<String> tickets, String userID, String username) {
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
        if (role.equals("ADMIN") || role.equals("ASSOCIATE") || role.equals("CUSTOMER")) {
            this.role = role;
        } else {
            throw new IllegalArgumentException("Role must be either ADMIN, ASSOCIATE or CUSTOMER");
        }
    }

    public List<String> getTickets() {
        return tickets;
    }

    public void setTickets(List<String> tickets) {
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
        if(tickets != null) {
            StringBuilder ticketIdList = new StringBuilder();
            ticketIdList.append("[");
            for (String ticket : tickets) {
                ticketIdList.append("{\"id\" : \"");
                ticketIdList.append(ticket);
                ticketIdList.append("\"}, ");
            }
            if (ticketIdList.length() > 1) {
                ticketIdList.deleteCharAt(ticketIdList.length() - 1);
                ticketIdList.deleteCharAt(ticketIdList.length() - 1);
            }
            ticketIdList.append("]");
            return "{" +
                    "\"id\":\"" + id + '\"' +
                    ", \"email\":\"" + email + '\"' +
                    ", \"firstName\":\"" + firstName + '\"' +
                    ", \"lastName\":\"" + lastName + '\"' +
                    ", \"role\":\"" + role + '\"' +
                    ", \"tickets\":" + ticketIdList +
                    ", \"userID\":\"" + userID + '\"' +
                    ", \"username\":\"" + username + '\"' +
                    '}';
        } else {
            return "{" +
                    "\"id\":\"" + id + '\"' +
                    ", \"email\":\"" + email + '\"' +
                    ", \"firstName\":\"" + firstName + '\"' +
                    ", \"lastName\":\"" + lastName + '\"' +
                    ", \"role\":\"" + role + '\"' +
                    ", \"tickets\":[]" +
                    ", \"userID\":\"" + userID + '\"' +
                    ", \"username\":\"" + username + '\"' +
                    '}';
        }


    }
}
