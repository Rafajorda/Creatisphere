package com.gvm_art.Backend_Payments_Springboot.application.exception.payments;

import com.gvm_art.Backend_Payments_Springboot.application.exception.ResourceNotFoundException;

public class PaymentMethodNotFoundException extends ResourceNotFoundException {
    public PaymentMethodNotFoundException() {
        super("Payment method not found or not supported");
    }
}
