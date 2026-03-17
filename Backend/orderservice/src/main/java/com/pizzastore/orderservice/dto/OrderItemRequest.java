package com.pizzastore.orderservice.dto;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long pizzaId;
    private String name;
    private double price;
    private int quantity;

}