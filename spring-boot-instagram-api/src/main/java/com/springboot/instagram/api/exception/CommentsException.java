package com.springboot.instagram.api.exception;

public class CommentsException extends RuntimeException {
    public CommentsException(String message) {
        super(message);
    }
}
