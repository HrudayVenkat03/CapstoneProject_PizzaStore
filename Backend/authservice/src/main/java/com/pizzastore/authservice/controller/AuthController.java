package com.pizzastore.authservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pizzastore.authservice.dto.AuthResponse;
import com.pizzastore.authservice.dto.LoginRequest;
import com.pizzastore.authservice.dto.RegisterRequest;
import com.pizzastore.authservice.service.AuthService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")

public class AuthController {
	@Autowired
    private AuthService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){

        return service.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){

        return service.login(request); 
    }

}
