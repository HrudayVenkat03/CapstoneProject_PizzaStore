package com.pizzastore.orderservice.dto;

import lombok.Data;

@Data
public class MenuItemResponse {

    private Long id;

    private String name;

    private int price;

    private int stock;

}