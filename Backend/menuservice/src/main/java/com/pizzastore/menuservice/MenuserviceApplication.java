package com.pizzastore.menuservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
public class MenuserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MenuserviceApplication.class, args);
	}

}
