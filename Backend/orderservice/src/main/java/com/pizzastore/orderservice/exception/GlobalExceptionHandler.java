package com.pizzastore.orderservice.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public Map<String, Object> handleRuntimeException(RuntimeException ex) {

        Map<String, Object> error = new HashMap<>();

        error.put("message", ex.getMessage());
        error.put("status", HttpStatus.BAD_REQUEST.value());
        error.put("timestamp", LocalDateTime.now());

        return error;
    }

    @ExceptionHandler(Exception.class)
    public Map<String, Object> handleException(Exception ex) {

        Map<String, Object> error = new HashMap<>();

        error.put("message", "Something went wrong");
        error.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.put("timestamp", LocalDateTime.now());

        return error;
    }
}