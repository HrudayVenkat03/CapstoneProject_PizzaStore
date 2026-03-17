package com.pizzastore.orderservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pizzastore.orderservice.dto.MenuItemResponse;
import com.pizzastore.orderservice.dto.OrderRequest;
import com.pizzastore.orderservice.entity.Order;
import com.pizzastore.orderservice.entity.OrderItem;
import com.pizzastore.orderservice.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    private RestTemplate restTemplate = new RestTemplate();


    /* PLACE ORDER */

    public Order placeOrder(OrderRequest request){

        Order order = new Order();

        order.setUserEmail(request.getUserEmail());
        order.setAddress(request.getAddress());
        order.setPaymentMode(request.getPaymentMode());
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> items = request.getItems().stream().map(i -> {

            String menuUrl = "http://localhost:8082/menu/" + i.getPizzaId();

            MenuItemResponse menuItem =            //getting menu items using rest templete
                    restTemplate.getForObject(menuUrl, MenuItemResponse.class);

            if(menuItem == null){
                throw new RuntimeException("Pizza not found");
            }

            if(i.getQuantity() > menuItem.getStock()){     // max stock validation
                throw new RuntimeException(
                        menuItem.getName() + " only " + menuItem.getStock() + " left in stock"
                );
            }

            int updatedStock = menuItem.getStock() - i.getQuantity();

            String updateStockUrl =
                    "http://localhost:8082/menu/" +
                    i.getPizzaId() +
                    "/stock/" +
                    updatedStock;

            restTemplate.put(updateStockUrl, null); //updates stock in menu

            OrderItem item = new OrderItem();

            item.setPizzaId(i.getPizzaId());
            item.setName(i.getName());
            item.setPrice(i.getPrice());
            item.setQuantity(i.getQuantity());

            item.setOrder(order);

            return item;

        }).collect(Collectors.toList());

        double total = items.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        order.setItems(items);
        order.setTotalPrice(total);

        return repository.save(order);
    }


    /* ADMIN - GET ALL ORDERS */

    public List<Order> getOrders(){
        return repository.findAllByOrderByIdDesc();
    }


    /* CUSTOMER - GET ORDERS BY EMAIL */

    public List<Order> getOrdersByUserEmail(String email){
        return repository.findByUserEmail(email);
    }


    /* ADMIN APPROVE ORDER */

    public Order approveOrder(Long id){

        Order order = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("APPROVED");

        return repository.save(order);
    }


  //ADMIN CANCEL ORDER (RESTORE STOCK)

    public Order cancelOrder(Long id){

        Order order = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Prevent restoring stock multiple times
        if(order.getStatus().equals("CANCELLED")){
            return order;
        }

        order.getItems().forEach(item -> {

            String menuUrl = "http://localhost:8082/menu/" + item.getPizzaId();

            MenuItemResponse menuItem =        //fetch current stock
                    restTemplate.getForObject(menuUrl, MenuItemResponse.class);

            if(menuItem != null){

                int updatedStock = menuItem.getStock() + item.getQuantity();

                String updateStockUrl =
                        "http://localhost:8082/menu/" +
                        item.getPizzaId() +
                        "/stock/" +
                        updatedStock;

                restTemplate.put(updateStockUrl, null);
            }

        });

        order.setStatus("CANCELLED");

        return repository.save(order);
    }


    /* GET ORDER BY ID */

    public Order getOrderById(Long id){

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found")); 

    }

}