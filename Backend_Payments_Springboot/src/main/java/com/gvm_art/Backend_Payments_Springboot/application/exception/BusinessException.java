package com.gvm_art.Backend_Payments_Springboot.application.exception;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
