package com.springboot.instagram.api.exception;

public class PostException extends RuntimeException {
    public PostException(String message) {
        super(message);
    }
}
