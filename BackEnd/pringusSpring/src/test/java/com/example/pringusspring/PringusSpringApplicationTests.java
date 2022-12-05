package com.example.pringusspring;

import com.example.pringusspring.model.Plane;
import com.example.pringusspring.model.Seating;
import com.example.pringusspring.repository.PlaneRepository;
import com.example.pringusspring.util.SeatingConverter;
import org.hibernate.AssertionFailure;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;

@SpringBootTest
class PringusSpringApplicationTests {
    @Autowired
    private PlaneRepository planeRepository;

    @Test
    void contextLoads() {
    }

    @Test
    void testSeatingConverter(){
        Seating seating = new Seating();
        seating.setCount(3);
        seating.setPattern(new int[]{1});
        seating.setStray(null);

        boolean[][] seatingArray = SeatingConverter.convert(seating);
        boolean[][] expected = new boolean[][]{{false}, {false}, {false}};

        assert Arrays.deepEquals(seatingArray, expected);
    }

    @Test
    void testSeatingConverter2(){
        Seating seating = new Seating();
        seating.setCount(4);
        seating.setPattern(new int[]{1,1});
        seating.setStray(null);

        boolean[][] seatingArray = SeatingConverter.convert(seating);
        boolean[][] expected = new boolean[][]{{false, false}, {false, false}};

        assert Arrays.deepEquals(seatingArray, expected);
    }

    @Test
    void testSeatingConverter3(){
        Seating seating = new Seating();
        seating.setCount(5);
        seating.setPattern(new int[]{1,1});
        seating.setStray(new int[]{1, 0});

        boolean[][] seatingArray = SeatingConverter.convert(seating);
        boolean[][] expected = new boolean[][]{{false, false}, {false, false}, {false, true}};

        assert Arrays.deepEquals(seatingArray, expected);
    }

    @Test
    void testSeatingConverter4(){
        Seating seating = new Seating();
        seating.setCount(6);
        seating.setPattern(new int[]{1,1});
        seating.setStray(null);

        boolean[][] seatingArray = SeatingConverter.convert(seating);
        boolean[][] expected = new boolean[][]{{false, false}, {false, false}, {false, false}};

        assert Arrays.deepEquals(seatingArray, expected);
    }

    @Test
    void testSeatingConverter5(){
        Seating seating = new Seating();
        seating.setCount(7);
        seating.setPattern(new int[]{1,1});
        seating.setStray(new int[]{1, 0});

        boolean[][] seatingArray = SeatingConverter.convert(seating);
        boolean[][] expected = new boolean[][]{{false, false}, {false, false}, {false, false}, {false, true}};

        assert Arrays.deepEquals(seatingArray, expected);
    }

    @Test
    void testSeatingConverter6(){
        Seating seating = new Seating();
        seating.setCount(8);
        seating.setPattern(new int[]{3,3});
        seating.setStray(new int[]{1, 0, 0, 1, 0, 0});

        boolean[][] seatingArray = SeatingConverter.convert(seating);
        boolean[][] expected = new boolean[][]{{false, false, false, false, false, false}, {false, true, true, false, true, true}};

        assert Arrays.deepEquals(seatingArray, expected);
    }

    @Test
    void testSeatingConverterWithPlane(){
        Plane plane = planeRepository.findByCode("CRJ").orElseThrow(() -> new AssertionFailure("Plane not found"));
        boolean[][] FirstSeatingArray = SeatingConverter.convert(plane.getFirst());
        boolean[][] BusinessSeatingArray = SeatingConverter.convert(plane.getBusiness());
        boolean[][] EconomySeatingArray = SeatingConverter.convert(plane.getEconomy());

        //firstExpected [[false, false, false], [false, false, false], [false, false, false], [false, true, true]]
        boolean[][] firstExpected = new boolean[][]{{false, false, false}, {false, false, false}, {false, false, false}, {false, true, true}};
        //businessExpected [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]
        boolean[][] businessExpected = new boolean[][]{{false, false, false, false}, {false, false, false, false}, {false, false, false, false}, {false, false, false, false}, {false, false, false, false}};
        //economyExpected [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]
        boolean[][] economyExpected = new boolean[][]{{false, false, false, false}, {false, false, false, false}, {false, false, false, false}, {false, false, false, false}, {false, false, false, false}};

        assert Arrays.deepEquals(FirstSeatingArray, firstExpected);
        assert Arrays.deepEquals(BusinessSeatingArray, businessExpected);
        assert Arrays.deepEquals(EconomySeatingArray, economyExpected);
    }

}
