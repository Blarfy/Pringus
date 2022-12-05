package com.example.pringusspring.controller;

import com.example.pringusspring.model.User;
import com.example.pringusspring.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginRESTController {

    @Autowired
    private MyUserDetailsService userDetailsService;

    //This is the standard login endpoint. It will also return the roles of the user who is logged in.
    @GetMapping("/")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSOCIATE', 'CUSTOMER')")
    public ResponseEntity<User> login() {
        User user = userDetailsService.getLoggedInUser();
        return ResponseEntity.ok(user);
    }
}
