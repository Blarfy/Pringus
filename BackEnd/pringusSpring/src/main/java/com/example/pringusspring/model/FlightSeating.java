package com.example.pringusspring.model;

public class FlightSeating {

    private boolean[][] businessClass;
    private boolean[][] economyClass;
    private boolean[][] firstClass;

    public FlightSeating() {
    }

    public FlightSeating(boolean[][] businessClass, boolean[][] economyClass, boolean[][] firstClass) {
        this.businessClass = businessClass;
        this.economyClass = economyClass;
        this.firstClass = firstClass;
    }

    public boolean[][] getBusinessClass() {
        return businessClass;
    }

    public void setBusinessClass(boolean[][] businessClass) {
        this.businessClass = businessClass;
    }

    public boolean[][] getEconomyClass() {
        return economyClass;
    }

    public void setEconomyClass(boolean[][] economyClass) {
        this.economyClass = economyClass;
    }

    public boolean[][] getFirstClass() {
        return firstClass;
    }

    public void setFirstClass(boolean[][] firstClass) {
        this.firstClass = firstClass;
    }
}
