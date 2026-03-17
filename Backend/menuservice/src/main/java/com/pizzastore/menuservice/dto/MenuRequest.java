package com.pizzastore.menuservice.dto;

import lombok.Data;

@Data
public class MenuRequest {
	private String name;
    private String description;
    private double price;
    private String category;
    private String imageUrl;
    private boolean available;
    private int stock; 

}
