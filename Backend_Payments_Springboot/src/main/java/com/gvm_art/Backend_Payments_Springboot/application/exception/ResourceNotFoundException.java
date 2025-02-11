package com.gvm_art.Backend_Payments_Springboot.application.exception;

public class ResourceNotFoundException extends BusinessException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
