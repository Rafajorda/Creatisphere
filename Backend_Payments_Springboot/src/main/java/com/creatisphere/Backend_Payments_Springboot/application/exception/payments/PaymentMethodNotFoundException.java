package com.creatisphere.Backend_Payments_Springboot.application.exception.payments;

import com.creatisphere.Backend_Payments_Springboot.application.exception.ResourceNotFoundException;

public class PaymentMethodNotFoundException extends ResourceNotFoundException {
    public PaymentMethodNotFoundException() {
        super("Payment method not found or not supported");
    }
}
