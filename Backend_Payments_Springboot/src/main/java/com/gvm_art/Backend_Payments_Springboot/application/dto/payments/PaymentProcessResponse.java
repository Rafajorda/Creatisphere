package com.gvm_art.Backend_Payments_Springboot.application.dto.payments;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentProcessResponse {
    
    private String id;
    private String clientSecret;
    
}
