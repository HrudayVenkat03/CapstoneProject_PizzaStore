package com.pizzastore.orderservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.pizzastore.orderservice.dto.OrderRequest;
import com.pizzastore.orderservice.entity.Order;
import com.pizzastore.orderservice.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public ResponseEntity<?> placeOrder(
            @RequestBody OrderRequest request,
            Authentication authentication){

        try{

            // Extract email from JWT token
            String email = authentication.getName();

            // Set email into request
            request.setUserEmail(email);

            Order order = service.placeOrder(request);

            return ResponseEntity.status(HttpStatus.CREATED).body(order);

        }catch(RuntimeException e){

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(){

        List<Order> orders = service.getOrders();

        return ResponseEntity.ok(orders);

    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Order> approveOrder(@PathVariable Long id){

        Order order = service.approveOrder(id);

        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long id){

        Order order = service.cancelOrder(id);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id){

        Order order = service.getOrderById(id);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/user/{email}")
    public List<Order> getOrdersByUser(@PathVariable String email){

        return service.getOrdersByUserEmail(email);

    }

}