package com.gvm_art.Backend_Payments_Springboot.domain.exceptionImpl;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.Map;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Error response structure")
public class Error {
    
    @Schema(description = "Error status", example = "error")
    private String status;

    @Schema(description = "Error descriptive message", 
           example = "Payment method not found or not supported")
    private String message;

    @Schema(description = "Additional error details", 
           example = "{\"paymentMethod\": [\"Payment method not supported\"]}")
    private Map<String, Object> errors;
    
}
