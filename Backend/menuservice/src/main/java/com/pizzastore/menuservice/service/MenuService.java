package com.pizzastore.menuservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pizzastore.menuservice.dto.MenuRequest;
import com.pizzastore.menuservice.entity.MenuItem;
import com.pizzastore.menuservice.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    private MenuRepository repository;


    // Add new pizza
    public MenuItem addPizza(MenuRequest request) {

        MenuItem item = new MenuItem();

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setCategory(request.getCategory());
        item.setImageUrl(request.getImageUrl());

        // set stock first
        item.setStock(request.getStock());

        // automatically set availability
        item.setAvailable(request.getStock() > 0);

        return repository.save(item);
    }


    // Get all pizzas (Admin use)
    public List<MenuItem> getAllPizzas() {

        return repository.findAll();
    }


    // Get only available pizzas (Customer menu)
    public List<MenuItem> getAvailablePizzas() {

        return repository.findByAvailableTrueAndStockGreaterThan(0);
    }


    // Get pizza by id
    public MenuItem getPizzaById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pizza not found"));
    }


    // Update pizza
    public MenuItem updatePizza(Long id, MenuRequest request) {

        MenuItem item = getPizzaById(id);

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setCategory(request.getCategory());
        item.setImageUrl(request.getImageUrl());

        // update stock
        item.setStock(request.getStock());

        // automatically update availability
        item.setAvailable(request.getStock() > 0);

        return repository.save(item);
    }


    // Update stock (called by OrderService)
    public MenuItem updateStock(Long id, int stock){

        MenuItem item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pizza not found"));

        item.setStock(stock);

        // update availability automatically
        item.setAvailable(stock > 0);

        return repository.save(item);
    }


    // Delete pizza
    public void deletePizza(Long id) {

        repository.deleteById(id);
    }

}