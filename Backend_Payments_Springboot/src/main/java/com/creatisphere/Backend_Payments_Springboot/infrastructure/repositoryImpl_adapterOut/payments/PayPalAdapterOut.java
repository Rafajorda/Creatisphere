package com.creatisphere.Backend_Payments_Springboot.infrastructure.repositoryImpl_adapterOut.payments;

import com.creatisphere.Backend_Payments_Springboot.domain.repository_portOut.payments.PaymentPortOut;
import com.creatisphere.Backend_Payments_Springboot.application.dto.payments.PaymentRequest;
import com.creatisphere.Backend_Payments_Springboot.application.exception.payments.PaymentProcessingException;

import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;
import java.util.Map;

@Component("paypal")
public class PayPalAdapterOut implements PaymentPortOut {

    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.mode}")
    private String mode;

    private final WebClient webClient = WebClient.builder().build();

    private String getBaseUrl() {
        return mode.equals("sandbox")
                ? "https://api-m.sandbox.paypal.com"
                : "https://api-m.paypal.com";
    }

    private Mono<String> getAccessToken() {
        return webClient.post()
                .uri(getBaseUrl() + "/v1/oauth2/token")
                .headers(headers -> {
                    headers.setBasicAuth(clientId, clientSecret);
                    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                })
                .bodyValue("grant_type=client_credentials")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .map(response -> (String) response.get("access_token"))
                .onErrorMap(e -> new PaymentProcessingException("Error obteniendo token de PayPal: " + e.getMessage()));
    }

    @Override
    public Mono<Map<String, Object>> processPayment(PaymentRequest paymentRequest) {
        return getAccessToken().flatMap(accessToken -> webClient.post()
                .uri(getBaseUrl() + "/v2/checkout/orders")
                .headers(headers -> {
                    headers.setBearerAuth(accessToken);
                    headers.setContentType(MediaType.APPLICATION_JSON);
                })
                .bodyValue(Map.of(
                        "intent", "CAPTURE",
                        "purchase_units", new Object[] {
                                Map.of("amount", Map.of(
                                        "currency_code", "EUR",
                                        "value",
                                        String.format(java.util.Locale.US, "%.2f", paymentRequest.getAmount())))
                        }))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                }))
                .onErrorMap(e -> new PaymentProcessingException(
                        "Error en el procesamiento de pago PayPal: " + e.getMessage()));
    }

    @Override
    public Mono<Map<String, Object>> capturePayment(String orderId) {
        return getAccessToken().flatMap(accessToken -> webClient.post()
                .uri(getBaseUrl() + "/v2/checkout/orders/" + orderId + "/capture")
                .headers(headers -> {
                    headers.setBearerAuth(accessToken);
                    headers.setContentType(MediaType.APPLICATION_JSON);
                })
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                }))
                .onErrorMap(
                        e -> new PaymentProcessingException("Error en la captura de pago PayPal: " + e.getMessage()));
    }
}