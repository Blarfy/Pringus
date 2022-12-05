package com.example.pringusspring.util;

import com.example.pringusspring.model.Seating;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SeatingConverter {
    public static Boolean[][] convert(Seating s){
        if(s == null){
            return null;
        }
        int count = s.getCount();
        int[] pattern = s.getPattern();
        int[] stray = s.getStray();
        List<List<Boolean>> seating = new ArrayList<>();
        int rowSeatCount = Arrays.stream(pattern).sum();
        int rowCount = count / rowSeatCount;
        int straySeatCount = count % rowSeatCount;

        if(straySeatCount!= 0){
            rowCount++;
        }

        for (int i = 0; i < rowCount; i++) {
            seating.add(new ArrayList<>());
            for (int j = 0; j < rowSeatCount; j++) {
                seating.get(i).add(false);
            }
        }

        if(straySeatCount!= 0){
            for (int i = 0; i < stray.length; i++) {
                if(stray[i] !=  1){
                    seating.get(rowCount-1).set(i, true);
                }
            }
        }

        //convert seating to boolean[][]
        Boolean[][] seatingArray = new Boolean[seating.size()][];
        for (int i = 0; i < seating.size(); i++) {
            seatingArray[i] = new Boolean[seating.get(i).size()];
            for (int j = 0; j < seating.get(i).size(); j++) {
                seatingArray[i][j] = seating.get(i).get(j);
            }
        }
        return seatingArray;
    }
}
