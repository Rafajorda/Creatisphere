package com.gvm_art.Backend_Payments_Springboot.domain.exceptionImpl;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.Map;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Error {
    
    private String status;
    private String message;
    private Map<String, Object> errors;
    
}
