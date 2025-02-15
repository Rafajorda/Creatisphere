package com.gvm_art.Backend_Payments_Springboot.application.dto.payments;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "PayPal capture response")
public class PayPalCaptureResponse {
    
    @Schema(description = "PayPal order identifier", example = "5O6P7Q8R9S0T")
    private String id;

    @Schema(description = "Capture status", example = "COMPLETED")
    private String status;
    
}
