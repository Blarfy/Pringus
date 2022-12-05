package com.example.pringusspring.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginRESTController {

        @RequestMapping("/")
        public boolean login() {
            return true;
        }
        //TODO: Return user roles
}
