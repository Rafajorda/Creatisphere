package com.gvm_art.Backend_Payments_Springboot.infrastructure.repositoryImpl_adapterOut.payments;

import com.gvm_art.Backend_Payments_Springboot.domain.repository_portOut.payments.PaymentPortOut;
import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PaymentRequest;
import com.gvm_art.Backend_Payments_Springboot.application.exception.payments.PaymentProcessingException;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.model.PaymentIntent;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import java.util.Map;

@Component("stripe")
public class StripeAdapterOut implements PaymentPortOut {
    
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public Mono<Map<String, Object>> processPayment(PaymentRequest paymentRequest) {
        return Mono.fromCallable(() ->
            PaymentIntentCreateParams.builder()
                .setAmount((long) (paymentRequest.getAmount() * 100))
                .setCurrency("eur")
                .addPaymentMethodType("card")
                .build()
        )
        .map(params -> {
            try {
                return PaymentIntent.create(params);
            } catch (StripeException e) {
                throw new PaymentProcessingException("Error en el procesamiento de pago Stripe: " + e.getMessage());
            }
        })
        .map(paymentIntent -> Map.<String, Object>of(
            "clientSecret", paymentIntent.getClientSecret(),
            "id", paymentIntent.getId()
        ))
        .onErrorMap(e -> new PaymentProcessingException("Error en el procesamiento de pago Stripe: " + e.getMessage()));
    }

    @Override
    public Mono<Map<String, Object>> capturePayment(String paymentIntentId) {
        return Mono.just(Map.<String, Object>of(
            "id", paymentIntentId,
            "status", "No capture needed for Stripe"
        ))
        .onErrorMap(e -> new PaymentProcessingException("Error en la captura de pago Stripe: " + e.getMessage()));
    }
}
