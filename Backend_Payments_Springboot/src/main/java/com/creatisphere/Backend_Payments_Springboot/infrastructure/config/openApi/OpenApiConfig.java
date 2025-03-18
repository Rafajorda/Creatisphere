package com.creatisphere.Backend_Payments_Springboot.infrastructure.config.openApi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("GVM Art Payment API")
                        .version("3.0.0")
                        .description("Payment processing API for GVM Art platform"));
    }
}
