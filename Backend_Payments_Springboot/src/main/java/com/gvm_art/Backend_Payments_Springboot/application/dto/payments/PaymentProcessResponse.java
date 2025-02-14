package com.gvm_art.Backend_Payments_Springboot.application.dto.payments;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "Payment process response")
public class PaymentProcessResponse {
    
    @Schema(description = "Payment identifier", example = "pi_3O4X2L2eZvKYlo2C1KwHpL9E")
    private String id;

    @Schema(description = "Client secret for payment confirmation", example = "pi_3O4X2L2eZvKYlo2C1KwHpL9E_secret_xyz")
    private String clientSecret;
    
}
