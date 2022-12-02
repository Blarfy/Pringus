package com.example.pringusspring.controller;

import com.example.pringusspring.model.Plane;
import com.example.pringusspring.repository.PlaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//This class is the same as the FlightRESTController class, but it is for the Planes model.
@RestController
@RequestMapping("/Planes")
public class PlanesRESTController {

    @Autowired
    private PlaneRepository planeRepository;

    public PlanesRESTController(PlaneRepository planeRepository) {
        this.planeRepository = planeRepository;
    }

    @GetMapping("/getAll")
    public String getAll() {
        return planeRepository.findAll().toString();
    }


    @GetMapping("/getByName/{name}")
    public String getByName(@PathVariable String name) {
        return planeRepository.findByName(name).toString();
    }

    @GetMapping("/getByCode/{code}")
    public String getByCode(@PathVariable String code) {
        return planeRepository.findByCode(code).toString();
    }
}
