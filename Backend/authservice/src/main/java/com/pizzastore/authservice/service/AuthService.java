package com.pizzastore.authservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pizzastore.authservice.Entity.User;
import com.pizzastore.authservice.dto.AuthResponse;
import com.pizzastore.authservice.dto.LoginRequest;
import com.pizzastore.authservice.dto.RegisterRequest;
import com.pizzastore.authservice.repository.UserRepository;
import com.pizzastore.authservice.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER USER
    public String register(RegisterRequest request){

        // check if email already exists
        if(repository.findByEmail(request.getEmail()).isPresent()){
            return "User already registered with this email";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("CUSTOMER");

        repository.save(user);

        return "User Registered Successfully";
    }

    // LOGIN USER
    public AuthResponse login(LoginRequest request){

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getRole());
    }
}