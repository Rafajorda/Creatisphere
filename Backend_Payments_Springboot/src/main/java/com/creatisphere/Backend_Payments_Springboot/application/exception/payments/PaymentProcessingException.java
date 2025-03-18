package com.creatisphere.Backend_Payments_Springboot.application.exception.payments;

import com.creatisphere.Backend_Payments_Springboot.application.exception.BusinessException;

public class PaymentProcessingException extends BusinessException {
    public PaymentProcessingException(String message) {
        super(message);
    }
}
