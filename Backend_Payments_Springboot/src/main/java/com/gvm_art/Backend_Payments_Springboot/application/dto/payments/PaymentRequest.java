package com.gvm_art.Backend_Payments_Springboot.application.dto.payments;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentRequest {

    private String paymentMethod;
    private Double amount;
    
}