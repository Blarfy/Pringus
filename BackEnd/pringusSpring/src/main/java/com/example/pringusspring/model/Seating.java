package com.example.pringusspring.model;

import com.example.pringusspring.serializer.SeatingSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Seating {
    private int count = 0;
    private int[] pattern = new int[0];
    //@JsonSerialize(using = SeatingSerializer.class)
    private int[] stray = new int[0];

    public Seating() {
    }

    public Seating(int count, int[] pattern, int[] stray) {
        this.count = count;
        this.pattern = pattern;
        this.stray = stray;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int[] getPattern() {
        return pattern;
    }

    public void setPattern(int[] pattern) {
        this.pattern = pattern;
    }

    public int[] getStray() {
        return stray;
    }

    public void setStray(int[] stray) {
        this.stray = stray;
    }

    public String getPatternString() {
        String patternString = "";
        for (int i = 0; i < pattern.length; i++) {
            patternString += pattern[i];
            if (i < pattern.length - 1) {
                patternString += ",";
            }
        }
        return patternString;
    }

    public String getStrayString() {
        String strayString = "";
        for (int i = 0; i < stray.length; i++) {
            strayString += stray[i];
            if (i < stray.length - 1) {
                strayString += ",";
            }
        }
        return strayString;
    }

    //this to string method returns a json string of the object
    @Override
    public String toString() {
        return "{" +
                "\"count\":" + getCount() +
                ", \"pattern\": [" + getPatternString() + "] " +
                (stray !=  null ? (", \"stray\": [" + getStrayString() +"]}") : "}");

    }
}
