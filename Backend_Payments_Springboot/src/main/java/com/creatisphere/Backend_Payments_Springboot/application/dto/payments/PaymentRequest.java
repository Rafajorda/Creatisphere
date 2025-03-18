package com.creatisphere.Backend_Payments_Springboot.application.dto.payments;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "Payment request information")
public class PaymentRequest {

    @Schema(description = "Payment method to use (stripe/paypal)", example = "stripe")
    private String paymentMethod;

    @Schema(description = "Amount to process", example = "99.99")
    private Double amount;
    
}