package com.pizzastore.orderservice.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {

    private String userEmail;
    
    private String address;     

    private String paymentMode;  

    private List<OrderItemRequest> items;

}