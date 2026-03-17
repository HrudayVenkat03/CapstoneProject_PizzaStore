package com.pizzastore.menuservice.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private String secret = "this_is_a_secure_very_long_secret_key_for_pizza_store_microservice_project";

    private Key key = Keys.hmacShaKeyFor(secret.getBytes());

    public String extractEmail(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {

        try {

            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {

            return false;

        }
    }
}