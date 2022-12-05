package com.example.pringusspring.model;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;

public class FlightSeating {
    private Boolean[][] businessClass = new Boolean[0][0];
    private Boolean[][] economyClass = new Boolean[0][0];
    private Boolean[][] firstClass = new Boolean[0][0];

    public FlightSeating() {
    }

    public FlightSeating(Boolean[][] businessClass, Boolean[][] economyClass, Boolean[][] firstClass) {
        this.businessClass = businessClass;
        this.economyClass = economyClass;
        this.firstClass = firstClass;
    }

    public Boolean[][] getBusinessClass() {
        return businessClass;
    }

    public void setBusinessClass(Boolean[][] businessClass) {
        this.businessClass = businessClass;
    }

    public Boolean[][] getEconomyClass() {
        return economyClass;
    }

    public void setEconomyClass(Boolean[][] economyClass) {
        this.economyClass = economyClass;
    }

    public Boolean[][] getFirstClass() {
        return firstClass;
    }

    public void setFirstClass(Boolean[][] firstClass) {
        this.firstClass = firstClass;
    }
}
