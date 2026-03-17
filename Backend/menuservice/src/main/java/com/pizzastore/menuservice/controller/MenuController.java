package com.pizzastore.menuservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pizzastore.menuservice.dto.MenuRequest;
import com.pizzastore.menuservice.entity.MenuItem;
import com.pizzastore.menuservice.service.MenuService;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {

    @Autowired
    private MenuService service;


    // Add new pizza
    @PostMapping
    public MenuItem addPizza(@RequestBody MenuRequest request) {

        return service.addPizza(request);

    }


    // ADMIN MENU (show all pizzas)
    @GetMapping
    public List<MenuItem> getAllPizzas() {

        return service.getAllPizzas();

    }


    // CUSTOMER MENU (only available pizzas)
    @GetMapping("/available")
    public List<MenuItem> getAvailablePizzas() {

        return service.getAvailablePizzas();

    }


    // Get pizza by id
    @GetMapping("/{id}")
    public MenuItem getPizza(@PathVariable Long id) {

        return service.getPizzaById(id);

    }


    // Update pizza
    @PutMapping("/{id}")
    public MenuItem updatePizza(@PathVariable Long id,
                                @RequestBody MenuRequest request) {

        return service.updatePizza(id, request);

    }


    // UPDATE STOCK (called by OrderService)
    @PutMapping("/{id}/stock/{stock}")
    public MenuItem updateStock(@PathVariable Long id,
                                @PathVariable int stock){

        return service.updateStock(id, stock);

    }


    // Delete pizza
    @DeleteMapping("/{id}")
    public String deletePizza(@PathVariable Long id) {

        service.deletePizza(id);

        return "Pizza Deleted Successfully";

    }

}