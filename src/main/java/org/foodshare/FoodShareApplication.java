package org.foodshare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodShareApplication {

    public static void main(String[] args) {
        System.out.println("==========================================================");
        System.out.println("   Starting FoodShare: Surplus Food Redistribution System  ");
        System.out.println("   Web UI: http://localhost:8080                          ");
        System.out.println("   REST API: http://localhost:8080/api/donations          ");
        System.out.println("   H2 Console: http://localhost:8080/h2-console           ");
        System.out.println("==========================================================");
        SpringApplication.run(FoodShareApplication.class, args);
    }
}
