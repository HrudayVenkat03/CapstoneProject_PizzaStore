package com.pizzastore.orderservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pizzastore.orderservice.entity.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {

    // Orders of a specific user
    List<Order> findByUserEmail(String userEmail);

    // All orders sorted by latest first
    List<Order> findAllByOrderByIdDesc();

}